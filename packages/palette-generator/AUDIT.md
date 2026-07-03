# Code Health Audit: `@repo/palette-generator`

**Audit date:** 2026-07-03
**Package path:** `packages/palette-generator`
**Role in monorepo:** Thin UI layer over `@repo/palette-engine` — color-space picker canvases + palette rule triggers. No build step (source consumed directly via Vite).

**Overall health:** Clean. 10 source files, zero `eslint-disable` directives, zero `as any` assertions, zero `@ts-ignore`/`@ts-expect-error`. The package is a straightforward composition of UI components over a dedicated color-math engine. No hyper-generic abstractions were found at the "high" severity level. Findings are confined to localized friction points.

---

### 📄 File: `src/components/controls/Controls.tsx`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** At line 29, `spaceId as ColorSpacesKey` and line 41, `key as RuleKey` are required because `Object.keys()` and `Object.entries()` return `string[]` / `[string, V][]` — TypeScript widens the key type and the strict `@tsconfig/strictest` config catches the mismatch. These are targeted type assertions (narrowing to a specific union, not escaping to `any`), so they are disciplined escapes, but they indicate a pattern: every time the component introspects a statically defined map at runtime, it needs an assertion.
- **Impact on Strictness:** 2 type assertions (`as ColorSpacesKey`, `as RuleKey`) to bridge the `Object.keys()` / `Object.entries()` type-widening gap.

---

### 📄 File: `src/components/controls/color-picker/ColorSpaceCanvas.tsx`

- **Type of Smell:** React 19 / React Compiler Friction & Duplicated Math
- **Complexity Score:** Medium
- **Architectural Observation:** The component uses `useMemo` (line 14) and `useEffect` (line 16) for the canvas render pipeline. With React Compiler active (configured via `babel-plugin-react-compiler` in `vite.config.ts`), the manual `useMemo` on `config` is redundant — the compiler would memoize the derived value automatically. The `useEffect` for the pixel paint loop is the correct pattern (side effect into DOM), so no change needed there. More significantly, the pixel-to-axis-range mapping math (lines 28-29):
  ```
  const x = xAxis.min + (px / size) * (xAxis.max - xAxis.min);
  const y = yAxis.max - (py / size) * (yAxis.max - yAxis.min);
  ```
  is an **exact duplicate** of the same mapping in `ColorSpaceControls.tsx` (lines 28-29). This is the one clear instance of preferred duplication over abstraction in this package — the math is simple and the contexts differ (pointer event vs. pixel loop), so the duplication is arguably correct per creative-coding philosophy. However, if the axis mapping ever changes (e.g., non-linear steps), it must be updated in two places.
- **Impact on Strictness:** None.

---

### 📄 File: `src/utils/color.ts`

- **Type of Smell:** Dead Code / Over-generalized Signature
- **Complexity Score:** Low
- **Architectural Observation:** `scaleTo255(value: number | null | undefined)` accepts nullable types, but **every call site** passes a `number` from `color.srgb` (a tuple of numbers). The `null | undefined` branches are dead code. The function's signature was apparently widened preemptively "just in case," which adds unnecessary surface area and weakens the contract. The `?? 0` coalesce is untested dead logic.
- **Impact on Strictness:** Accepts `null | undefined` where only `number` is actually passed — minor weakening of the input contract.

---

### 📄 File: `src/components/display/Display.tsx`

- **Type of Smell:** Weak React Keys
- **Complexity Score:** Low
- **Architectural Observation:** Two key-generation patterns risk runtime duplicates:
  1. **Line 16:** `paletteId = palette.colors.join()` — If two palettes have the same sequence of colors (same rule applied to the same base color), they produce identical keys, causing React to skip re-rendering the second palette or produce a console warning.
  2. **Line 24:** `color.to('lch').toString()` — Two different colors that serialize to the same LCH string (possible with precision truncation or different input spaces mapping to the same LCH coords) would collide. Using array index (or a counter/uuid) would be more robust.
- **Impact on Strictness:** None.

---

### 📄 File: `src/components/controls/color-picker/ColorSpaceControls.tsx`

- **Type of Smell:** Loose Runtime Type
- **Complexity Score:** Low
- **Architectural Observation:** The `spaceId` parameter defaults to the string literal `'oklch'` (line 13) but the type annotation is `keyof typeof colorSpaces`. The default value is not type-checked against the union — a typo like `'oklch'` → `'oklhc'` would not be caught until runtime. Additionally, `spaceId` is typed as optional (`spaceId?:`) with the default applied in destructuring, which is correct but means callers can't tell from the signature alone what the default space is.
- **Impact on Strictness:** The default string `'oklch'` is not validated against the type-level union at compile time.

---

### 📄 File: `src/utils/maths.ts`

- **Type of Smell:** Minor — Chain-style abstraction over a 2-line formula
- **Complexity Score:** Low
- **Architectural Observation:** `createRemap` is a well-designed curried remapping utility. The `.to().asFloat()` / `.to().asInt()` chain API is clean but over-engineered for what is essentially `outMin + ((v - inMin) / range) * outRange` — a formula used directly in the two canvas files. The zero-range throw (line 2-3) is good defensive practice. Not flagged as a problem, just noted: this is the package's only abstract utility and it is used exactly once (by `scaleTo255`).
- **Impact on Strictness:** None.

---

### 📄 File: `src/stores/palette/store.ts`

- **Type of Smell:** Library-class leak into state shape
- **Complexity Score:** Low
- **Architectural Observation:** The store exposes `Color` (from `colorjs.io`) directly as its state type. Any consumer must import and understand the `Color` class API. The `initialBaseColor` is constructed imperatively (`new Color(...)`) at module scope. This is standard Zustand singleton practice, but it means the store is not tree-shakeable and state is global — acceptable for this app's scale.
- **Impact on Strictness:** None.

---

## Summary

| File                     | Smell Category                            | Severity |
| ------------------------ | ----------------------------------------- | -------- |
| `Controls.tsx`           | Linter Workaround (2 type assertions)     | Low      |
| `ColorSpaceCanvas.tsx`   | React Compiler friction + duplicated math | Medium   |
| `color.ts`               | Dead code in signature                    | Low      |
| `Display.tsx`            | Weak React keys                           | Low      |
| `ColorSpaceControls.tsx` | Loose runtime default type                | Low      |
| `maths.ts`               | Over-engineered utility (minor)           | Low      |
| `store.ts`               | Library-class leak                        | Low      |

**No instances found of:** Massive `if/else`/`switch` blocks, hyper-generic config objects, `eslint-disable` directives, `as any`, `@ts-ignore`, manual `useCallback`, or render-phase math outside of the isolated canvas paint loop. The package is a well-scoped UI layer that delegates all color math to `@repo/palette-engine`.

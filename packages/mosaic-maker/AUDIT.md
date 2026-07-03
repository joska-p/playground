# Mosaic Maker — Code Health Audit

Audit date: 2026-07-03
Package: `@repo/mosaic-maker` (packages/mosaic-maker)
Total source files: 28 (excluding configs, assets, node_modules)

**Overall assessment:** This package is unusually clean. The developer followed a disciplined modular structure with clear separation of concerns (core constants, store, components, utils). No `eslint-disable`, `@ts-ignore`, or `@ts-expect-error` comments exist anywhere. Most findings are minor strictness bypasses and one case of React Compiler friction.

---

### 📄 File: `src/utils/random/shuffleObject.ts`

- **Type of Smell:** Universal Function Abstraction / Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** `shuffleObject` is a generic utility (`T extends Record<string, unknown>`) that shuffles an object's values while preserving key order. It is used for two distinct purposes: shuffling palette colors AND shuffling rotation values. The function itself is small, but the `as T` cast on line 8 is necessary because `Object.fromEntries()` cannot infer the branded structural type `T`. This creates a fragile contract — callers get back `T` but the values are permuted, which violates the implicit expectation that key–value associations are stable.
- **Impact on Strictness:** 1 type assertion (`as T`) to force the return type through `Object.fromEntries`. Callers that rely on the original key–value pairing (e.g. palette consumers) get no compile-time protection.

---

### 📄 File: `src/utils/palettes/fetchPalettes.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Medium
- **Architectural Observation:** This file packs three distinct responsibilities into one module — cache I/O (localStorage read/write with TTL/version), network fetching (fetch + Zod validation), and data transformation (flat color arrays → `Palette` objects with CSS var keys). The `createPalette` helper builds a `Palette` via `{} as Palette` (line 45) because the shape has a dynamic key set (`--color-0` through `--color-4`). The `getCachedPalettes` function parses JSON with `JSON.parse(stored) as CachedPalettes` (line 30), performing no runtime validation against the `CachedPalettes` shape — a corrupted localStorage entry would silently produce a structurally wrong object that only `isCacheValid` (which checks `expiration` and `version` but not shape) would guard against.
- **Impact on Strictness:** 2 type assertions (`as CachedPalettes` on deserialized JSON, `as Palette` during incremental object construction). The cache deserialization in particular is a blind spot — stale or tampered localStorage data could flow into the rest of the system as a valid `Palette[]`.

---

### 📄 File: `src/utils/tiles/generateTileColors.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** `generateTileColors` returns a fixed-length 5-tuple `[string, string, string, string, string]` but uses `shuffleArray` (which returns `T[]`) and casts the result. The 5-element length is never verified at runtime — if `CSS_VAR_KEYS` were ever changed to have fewer or more elements, the return type would silently misrepresent the actual length.
- **Impact on Strictness:** 1 type assertion (`as [string, string, string, string, string]`) to narrow the generic array return to a fixed-length tuple.

---

### 📄 File: `src/components/MosaicDisplay.tsx`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** The `MOSAIC_STYLES` constant (line 8–16) is constructed by spreading several plain objects (`initialPalette`, `initialTileSize`, `initialGapSize`, `initialRotations`) and adding CSS properties. The whole object is cast with `as React.CSSProperties` because TypeScript cannot verify that the spread keys (CSS custom property names like `--tile-size`, `--color-0`, etc.) are valid React CSS properties. This is a pragmatic escape hatch for the CSS variables pattern used throughout.
- **Impact on Strictness:** 1 type assertion (`as React.CSSProperties`) to bypass strict CSS property checking on a dynamically-constructed style object.

---

### 📄 File: `src/components/controls/TileSetControls.tsx`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** On line 27, `style={{ ...initialPalette } as React.CSSProperties}` uses the same pattern as `MosaicDisplay.tsx` — spreading a `Palette` (which has CSS custom property keys like `--color-0`) into a React `style` prop and casting. The palette object is being repurposed as a CSS variable map on a non-palette DOM element (the tile set control grid container), which is a legitimate use of CSS variables but requires the type escape.
- **Impact on Strictness:** 1 type assertion (`as React.CSSProperties`).

---

### 📄 File: `src/components/controls/useLayoutSection.ts`

- **Type of Smell:** React 19 / React Compiler Friction
- **Complexity Score:** Low
- **Architectural Observation:** The `useSliderState` hook (line 7–38) combines local state (`useState`), Zustand store reads (`useMosaicRef`), direct DOM manipulation (`style.setProperty`), a debounce mechanism via `useRef`/`useEffect`, and a store action call (`regenerateTiles`). The `onChange` callback is wrapped in `useCallback` with `[mosaicRef, cssVar, debounceMs]` as dependencies. With React Compiler active (the `babel-plugin-react-compiler` preset is configured in `vite.config.ts`), this `useCallback` is redundant — the compiler would automatically memoize the closure. The hook also mixes React state (the slider `value`) with imperative DOM updates (setting CSS variables directly), splitting the mental model of "where state lives."
- **Impact on Strictness:** Not a strictness issue. Introduces unnecessary manual memoization where the compiler would handle it, representing preventable overhead in both maintenance and runtime dep array comparisons.

---

### 📄 File: `src/core/TILE_REGISTRY.ts` (notable clean pattern — no smell)

- **Observation:** The `Shape` discriminated union and `TILE_REGISTRY` record are exemplary. Each of the 8 tile definitions is an explicit, self-contained data structure with no abstraction layer, no configuration objects, and no conditional logic. Adding a new tile type means adding a new entry to the registry and optionally a `Shape` variant. This is a textbook case of "clean duplication" over fragile abstraction in creative coding contexts.

---

### 📄 File: `src/components/Tile.tsx` (notable clean pattern — no smell)

- **Observation:** `ShapeRenderer` uses a discriminated `switch` on `shape.type` to render the correct SVG primitive. The `colors` array is passed through as CSS variable references (`--color-N`), letting the DOM resolve the actual colors — this cleanly separates tile geometry from palette application.

---

## Summary: Smell Counts

| Smell Type | Count | Severity |
|---|---|---|
| Universal Function / Hyper-Generic | 0 | — |
| Linter Workaround (type assertions) | 5 sites across 5 files | Low |
| React Compiler Friction | 1 (`useCallback`) | Low |
| Mix of concerns (moderate) | 1 (`fetchPalettes.ts`) | Medium |

## Key Architectural Observations

1. **No `eslint-disable` comments exist anywhere** — the strict ESLint config was never loosened for this package.
2. **5 type assertions** exist, all for legitimate TypeScript limitations: dynamic CSS property keys (`as React.CSSProperties`), incremental object building (`as Palette`), JSON deserialization (`as CachedPalettes`), and generic return narrowing (`as T`, `as [...]`).
3. **1 case of React Compiler friction** — the `useCallback` in `useLayoutSection.ts` is rendered unnecessary by the compiler.
4. **`fetchPalettes.ts` carries the most complexity** — it mingles caching, fetching, schema validation, and data transformation in a single module. This is the highest-priority refactoring target if concerns need separating.

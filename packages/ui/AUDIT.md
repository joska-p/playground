# Code Health Audit: `@repo/ui`

> **Package Path:** `packages/ui`
> **Role:** Shared UI component library (Tailwind + CVA + React 19 with React Compiler)
> **Files Scanned:** ~90 source files

---

## 1. Universal Function / Hyper-Generic Abstraction

### 📄 File: `src/lib/variants/create-variant.ts`

- **Type of Smell:** Universal Function Abstraction
- **Complexity Score:** Medium
- **Architectural Observation:** The `createVariant` function wraps CVA's `cva()` but imposes an extremely restrictive type constraint `V extends Record<string, Record<string, string>>` — every variant value must be a flat string-to-string map. This precludes variants with numeric, array, or nested values, and the `as Parameters<typeof cva<V>>[1]` cast on line 9 silently papers over any type mismatch between the wrapper signature and CVA's own config type. The abstraction is too tight to be useful for anything beyond trivial string-only variants; any variant needing richer values must bypass it.
- **Impact on Strictness:** Uses 1 type assertion (`as Parameters<typeof cva<V>>[1]`) to mask the type mismatch between the wrapper's layer and CVA's parameter type.

### 📄 File: `src/components/icons/lib.tsx`

- **Type of Smell:** Universal Function Abstraction (Leaky Factory)
- **Complexity Score:** Medium
- **Architectural Observation:** The `createIcon` factory (line 12) creates SVG icon components with hardcoded `fill="none"`, `stroke="currentColor"`, and `strokeWidth={2}`. 44 icons use this factory successfully, but `IconSpinner.tsx` completely bypasses it because the spinner icon needs `fill="currentColor"` and omits `stroke`/`strokeWidth`. The factory's default props are rigid — any icon deviating from the "outline stroke" convention must hand-write a full `<svg>` element, negating the abstraction's value. The `CreateIconConfig` type also provides no mechanism to override SVG attributes per-icon.
- **Impact on Strictness:** None directly, but the leaky abstraction means inconsistencies proliferate silently.

### 📄 File: `src/components/widgets/control-panel/controls/ControlRenderer.tsx`

- **Type of Smell:** Universal Function (Switch Dispatch)
- **Complexity Score:** Low
- **Architectural Observation:** An 8-way `switch` on `control.type` dispatches to dedicated sub-components. Each new control type requires editing this file. While acceptable for a contained renderer, the `default` branch uses `console.warn` (line 34) for unknown types — a runtime escape hatch that silently swallows type errors at build time. The `Control` union type could theoretically be made exhaustive via a never-check, but none is present.
- **Impact on Strictness:** None.

---

## 2. Linter Fighting & Config Loosening

### 📄 File: `eslint.config.js` (project root)

- **Type of Smell:** Linter Workaround — Global Rule Reduction
- **Complexity Score:** High
- **Architectural Observation:** Six `@typescript-eslint` strictness rules are disabled globally across all files (lines 11-16): `no-unsafe-assignment`, `no-unsafe-call`, `no-unsafe-member-access`, `no-redundant-type-constituents`, `restrict-template-expressions`, and `no-non-null-assertion`. This is the config-level equivalent of sprinkling `// eslint-disable-next-line` across the entire codebase. Rather than suppressing specific file-level violations, the project downgraded the shared strict config wholesale. This legalizes `as any` patterns, template expressions with arbitrary types, and `!` assertions anywhere without any local annotation signaling the bypass.
- **Impact on Strictness:** Complete erosion of 6 safety rules across all files.

### 📄 File: `src/components/elements/badge/Badge.tsx` (line 15)

- **Type of Smell:** Linter Workaround — Type Assertion
- **Complexity Score:** Low
- **Architectural Observation:** Injects CSS custom property `--_color` via inline `style` prop. React's `CSSProperties` type does not recognize arbitrary `--*` properties, so the value is cast with `as React.CSSProperties`. This is a known React typing limitation, but the lack of a shared utility means every component that needs custom properties reinvents the same 1-line workaround.
- **Impact on Strictness:** Uses 1 type assertion to bypass React's CSS property typing.

### 📄 File: `src/components/stylistic/organisms/SectionHeader.tsx` (line 37)

- **Type of Smell:** Linter Workaround — Type Assertion
- **Complexity Score:** Low
- **Architectural Observation:** Same pattern as `Badge.tsx` — injects `--accent` CSS custom property with `as React.CSSProperties`.
- **Impact on Strictness:** Uses 1 type assertion.

### 📄 File: `src/components/stylistic/molecules/CategoryCard.tsx` (line 39)

- **Type of Smell:** Linter Workaround — Type Assertion
- **Complexity Score:** Low
- **Architectural Observation:** Injects `--border` and `--accent` custom properties with `as React.CSSProperties`.
- **Impact on Strictness:** Uses 1 type assertion.

### 📄 File: `src/components/stylistic/molecules/DocCard.tsx` (line 36)

- **Type of Smell:** Linter Workaround — Type Assertion
- **Complexity Score:** Low
- **Architectural Observation:** Injects `--border` and `--card-accent` custom properties with `as React.CSSProperties`.
- **Impact on Strictness:** Uses 1 type assertion.

### 📄 File: `src/components/stylistic/molecules/ProjectCard.tsx` (line 38)

- **Type of Smell:** Linter Workaround — Type Assertion
- **Complexity Score:** Low
- **Architectural Observation:** Injects `--border` and `--card-accent` custom properties with `as React.CSSProperties`.
- **Impact on Strictness:** Uses 1 type assertion.

### 📄 File: `src/lib/variants/create-variant.ts` (line 9)

- **Type of Smell:** Linter Workaround — Type Assertion
- **Complexity Score:** Medium
- **Architectural Observation:** Casts the second argument to `cva<V>()` with `as Parameters<typeof cva<V>>[1]`. This bypasses any type disagreement between the wrapper's inferred config shape and CVA's parameter type. If future CVA versions change their API signature, this cast will silently allow mismatched arguments.
- **Impact on Strictness:** Uses 1 type assertion masking a genuine type boundary.

---

## 3. React 19 & React Compiler Friction

> The project uses `@vitejs/plugin-react` with `reactCompilerPreset()` in `vite.config.ts:7`, meaning React Compiler auto-memoizes. All `useCallback`/`useMemo` calls below produce no runtime benefit — the compiler would produce the same stable references automatically.

### 📄 File: `src/components/stylistic/organisms/FloatingNav.tsx` (lines 22-56)

- **Type of Smell:** Redundant Manual Memoization (React Compiler)
- **Complexity Score:** Medium
- **Architectural Observation:** Contains 4 `useCallback` wrappers (`isAtTop`, `show`, `scheduleHide`, `updateVisibility`) and 2 `useEffect` hooks. `isAtTop` (line 22) is a pure one-liner with zero dependencies — the simplest case the compiler handles. `show` (line 24) is a single `setVisible(true)` call. `scheduleHide` (line 28) and `updateVisibility` (line 36) wrap simple state logic. The `useEffect` on line 44 listens to scroll and calls `updateVisibility`; the effect on line 54 runs `updateVisibility` on mount. Under React Compiler, the entire scroll-visibility orchestration could be expressed as plain function calls with the compiler stabilizing closures automatically. The manual dep arrays (especially `[isAtTop, show, scheduleHide]`) add fragility — any missed dependency will manifest as stale behavior, and the compiler would have caught it.
- **Impact on Strictness:** None.

### 📄 File: `src/components/feedback/toast/Toast.tsx` (lines 17-52)

- **Type of Smell:** Redundant Manual Memoization (React Compiler)
- **Complexity Score:** Medium
- **Architectural Observation:** Contains 5 `useCallback` wrappers. `removeToast` (line 17) is a single `setToasts` filter. `addToast` (line 21) wraps state + `setTimeout` logic. `info`, `success`, `error` (lines 35-52) are one-liner delegates to `addToast` with a hardcoded variant. The `info`/`success`/`error` triplet is especially dead weight — each is a trivial `addToast(variant, title, description)` that the compiler would inline. The dependency chain (`info → addToast → removeToast`) creates unnecessary coupling: changing any intermediate function signature requires auditing the dep arrays of all dependents.
- **Impact on Strictness:** None.

### 📄 File: `src/components/widgets/sidebar/Sidebar.tsx` (lines 50-86)

- **Type of Smell:** Redundant Manual Memoization (React Compiler)
- **Complexity Score:** Medium
- **Architectural Observation:** Contains 3 `useCallback` wrappers (`openSidebar`, `closeSidebar`, `toggleSidebar`) and 2 `useMemo` wrappers (`value`, `sidebarStyles`). `value` (line 66) is a plain object literal `{ isOpen, toggleSidebar, ... }` — trivial object construction the compiler handles automatically. `sidebarStyles` (line 79) is a shallow `{ ...style, ...conditionals }` spread. Both `useMemo` calls are purely cosmetic under React Compiler. The `useCallback` triple (lines 50-64) all follow the same pattern: guarded `setState` + `onOpenChange` callback — stable under the compiler.
- **Impact on Strictness:** None.

### 📄 File: `src/hooks/useResizeObserver.ts` (line 17)

- **Type of Smell:** Redundant Manual Memoization (React Compiler)
- **Complexity Score:** Low
- **Architectural Observation:** Uses `useCallback` with empty deps `[]` for a callback ref (line 17). Callback refs do need stable identity under React 18 (they're called on every render if re-created), making this borderline legitimate. However, React 19's ref cleanup model and the compiler's optimization may make this unnecessary.
- **Impact on Strictness:** None.

---

## 4. Code Duplication

### 📄 File: `src/components/feedback/alert/Alert.tsx` (lines 11-157) and `src/components/feedback/toast/iconMap.tsx` (lines 4-149)

- **Type of Smell:** Duplicate Code
- **Complexity Score:** Low
- **Architectural Observation:** These two files define **identical SVG icon maps** for the same 6 states (`default`, `primary`, `secondary`, `accent`, `destructive`, `warning`). The SVG paths are byte-for-byte identical across both files: the info circle icon, the success checkmark, the accent star, the alert triangle, the destructive X-circle, and the warning octagon. Each map is ~150 lines of inline SVG. Additionally, both `Alert.tsx` (lines 159-166) and `ToastItem.tsx` (lines 6-13) define their own `iconColorMap` mapping the same variants to the same Tailwind color classes. A shared `feedback-icons.ts` module under `src/components/feedback/` would eliminate ~300 lines of duplication.
- **Impact on Strictness:** None.

---

## 5. Empty / Zombie Variants

### 📄 File: `src/components/feedback/toast/toastVariants.ts` (lines 6-13)

- **Type of Smell:** Dead Code Paths (Empty Variants)
- **Complexity Score:** Low
- **Architectural Observation:** All 6 variant values (`default`, `primary`, `secondary`, `accent`, `destructive`, `warning`) are empty strings `''`. The variant dimension exists structurally — it's accepted by the component API — but provides zero visual distinction. The actual styling differentiation happens elsewhere (likely in `ToastItem.tsx`'s icon and color logic). This creates a misleading API surface where consumers expect `variant="destructive"` to change styling, but the CVA class is `''`.
- **Impact on Strictness:** None.

### 📄 File: `src/components/overlay/popover/popoverVariants.ts` (lines 12-19)

- **Type of Smell:** Dead Code Paths (Empty Variants)
- **Complexity Score:** Low
- **Architectural Observation:** Same pattern — all 6 variant values are empty strings. The `side` variant dimension (top/bottom/left/right) has real values, but the `variant` dimension is a no-op.
- **Impact on Strictness:** None.

### 📄 File: `src/components/navigation/tabs/tabsVariants.ts` (lines 5-13)

- **Type of Smell:** Dead Code Paths (Empty Variants)
- **Complexity Score:** Low
- **Architectural Observation:** The `tabsVariants` export (line 3) has all 6 `variant` values empty. Notably, the companion `tabTriggerVariants` export (line 20) has real variant values — so only half the tabs subsystem uses its variant dimension. The container variant is a zombie.
- **Impact on Strictness:** None.

### 📄 File: `src/components/layout/carousel/carouselSlideVariants.ts` (lines 11-18)

- **Type of Smell:** Dead Code Paths (Empty Variants)
- **Complexity Score:** Low
- **Architectural Observation:** The `variant` dimension (6 entries) is all empty strings, while the `size` dimension has real `sm`/`md`/`lg` values. The variant dimension exists only for API compatibility.
- **Impact on Strictness:** None.

### 📄 File: `src/components/layout/card/cardVariants.ts` (lines 6-14)

- **Type of Smell:** Dead Code Paths (Empty Variants)
- **Complexity Score:** Low
- **Architectural Observation:** 6 of 7 variant values are empty strings (default/primary/secondary/accent/destructive/warning). Only `interactive` has actual Tailwind classes. The 6 empty entries serve only as API decoration.
- **Impact on Strictness:** None.

---

## 6. Redundant Type Constructions

### 📄 Files: `src/components/layout/card/Card.tsx:6`, `src/components/form/radio/Radio.tsx:6`, `src/components/form/checkbox/Checkbox.tsx:6`, `src/components/elements/label/Label.tsx:4`, `src/components/elements/switch/Switch.tsx:6`

- **Type of Smell:** Redundant Syntax — Empty Object Intersection
- **Complexity Score:** Low
- **Architectural Observation:** All five files define a props type as `{} & ComponentProps<'...'>`. The `{} &` prefix is a no-op intersection — it adds no constraints, no properties, and no behavioral change. This is likely a left-over pattern from an earlier type structure that was later removed. Found in 5 files across the codebase, suggesting a copy-paste convention.
- **Impact on Strictness:** None.

---

## 7. Defensive Gaps

### 📄 File: `src/components/widgets/control-panel/controls/Number.tsx` (line 15)

- **Type of Smell:** Missing Edge Case Handling
- **Complexity Score:** Low
- **Architectural Observation:** `parseFloat(e.target.value)` on an `<input type="number">` can return `NaN` for empty input (`""`) or non-numeric strings like `"e"`. The result is passed directly to `control.onChange()` without a `Number.isNaN` guard. An empty input field will propagate `NaN` through the control's onChange chain.
- **Impact on Strictness:** None.

### 📄 File: `src/components/elements/slider/Slider.tsx` (line 35)

- **Type of Smell:** Missing Edge Case Handling
- **Complexity Score:** Low
- **Architectural Observation:** Same `parseFloat`-without-guard pattern. While range inputs are less prone to non-numeric input, an empty `value` attribute would still produce `NaN` on first render's onChange call if the uncontrolled state hasn't settled.
- **Impact on Strictness:** None.

---

## 8. Suspicious / Non-Standard CSS Usage

### 📄 File: `src/components/widgets/color-palette/colorPaletteVariants.ts` (line 16)

- **Type of Smell:** Potentially Broken CSS Selector
- **Complexity Score:** Low
- **Architectural Observation:** Uses `has-checked:shadow-[...]` as a Tailwind variant. `has-checked:` is not a standard Tailwind variant — the standard would be `has-[:checked]:` or a custom plugin variant. If this isn't configured in the Tailwind config, these styles are silently dead. All 6 variant entries (lines 16-21) use this pattern.
- **Impact on Strictness:** None.

---

## Summary

| Category | Count | Max Severity |
|---|---|---|
| Universal Function / Hyper-Generic | 3 files | Medium |
| Type Assertions / Linter Workarounds | 7 files (incl. 1 global config) | High |
| React Compiler Redundant Memoization | 4 files | Medium |
| Code Duplication | 2 files (one structural) | Medium |
| Empty / Zombie Variants | 5 variant files | Low |
| Redundant `{} &` Intersection Types | 5 files | Low |
| Missing Edge Case Guards | 2 files | Low |
| Potentially Broken CSS | 1 file | Low |

**Total files with findings:** ~25 (out of ~90 source files)

# Tailwind Cleanup Report — @repo/ui

Generated: 2026-05-29
Directory: /workspaces/playground/packages/ui

---

## External Dependencies (black boxes)

No components are imported from outside the package boundary. All imports resolve within `src/`.

Two CSS module files (`sidebar.module.css`) are used — treated as black boxes for class analysis, but no Tailwind heritage issues arise from them.

---

## Usage Map Summary

This package defines UI primitives (Button, Card, Badge, Input, Select, Slider, Switch, Label, ColorPalette) plus a Sidebar compound widget. Most components are only exported — not consumed within the package. The only intra-package call sites are:

- `App.tsx:8` → `<Button>Click me</Button>` — no className passed, parent is a plain `div` with no flex/grid layout.
- `SidebarToggle.tsx:11` → `<Button size="icon" variant="ghost" />` — the Button wraps toggle content with `className={cn("sidebar-toggle", styles.toggle, className)}`. No parent-context heritage conflict.

All other components are leaf exports. Heritage analysis (B2) is therefore minimal — there are no repeated parent→child class patterns to clean up.

The theme is defined via CSS custom properties in `gruvbox-theme.css` using Tailwind v4 `@theme inline`. Standard tokens (`bg-card`, `text-muted-foreground`, `border-border`, etc.) are all well-formed and verifiable.

---

## Proposed Changes

### src/components/slider/Slider.tsx

#### Classes to remove — intra-component

| ID  | Line | Element | Class(es) | Reason |
| --- | ---- | ------- | --------- | ------ |
| C1  | 3*   | root div | `block`   | Redundant Tailwind default — always applied to a `<div>` which is already `display: block`. When layout=horizontal, `flex` overrides it anyway. Located in `sliderVariants` base string in `sliderVariants.ts:3`. |

\* Line reference points to `sliderVariants.ts:3` where the CVA base string `"block w-full rounded-md py-2 transition-colors"` is defined.

#### Flags — do not touch, requires review

| ID  | File | Line | Class(es) | Reason |
| --- | ---- | ---- | --------- | ------ |
| —   | —    | —    | —         | No flags for this file. |

---

### src/components/switch/switchVariants.ts

#### Flags — do not touch, requires review

| ID  | Line | Class(es) | Reason |
| --- | ---- | --------- | ------ |
| F1  | 16   | `w-13`    | `w-13` is not a standard Tailwind v4 spacing token (scale jumps from 12 to 14). No custom `--spacing-13` is defined in any theme file within the package. Likely intended as `w-14`. ⚠️ VERIFY before changing — confirm intent with design or check if this is consumed by external CSS. |

---

### src/components/widgets/sidebar/SidebarPanel.tsx

#### Flags — do not touch, requires review

| ID  | Line | Class(es)      | Reason |
| --- | ---- | -------------- | ------ |
| F2  | 7    | `sidebar-panel` | Plain string class — not a Tailwind utility, not a theme token, not referenced as a CSS selector anywhere in the package. Possibly a debugging aid or external-consumer styling hook. ⚠️ VERIFY whether it can be removed. |

---

### src/components/widgets/sidebar/SidebarToggle.tsx

#### Flags — do not touch, requires review

| ID  | Line | Class(es)       | Reason |
| --- | ---- | --------------- | ------ |
| F3  | 16   | `sidebar-toggle` | Same as F2 — plain string class, no internal consumer. ⚠️ VERIFY whether it can be removed. |

---

### No changes proposed for:

| File | Reason |
| ---- | ------ |
| `src/App.tsx` | No issues — all classes are theme tokens or standard utilities, no duplicates, no heritage conflicts. |
| `src/main.tsx` | No Tailwind classes. |
| `src/utils/cn.ts` | No JSX. |
| `src/hooks/useResizeObserver.ts` | No JSX. |
| `src/components/badge/Badge.tsx` | Clean. Variants are well-structured, no redundant classes. |
| `src/components/badge/badgeVariants.ts` | Clean. |
| `src/components/button/Button.tsx` | Clean. Loading spinner wrapper is correctly minimal. |
| `src/components/button/buttonVariants.ts` | Clean. |
| `src/components/card/Card.tsx` | Clean. `p-6 pt-0` pattern in CardContent/CardFooter is intentional (delegates top padding to CardHeader). |
| `src/components/card/cardVariants.ts` | Clean. |
| `src/components/input/Input.tsx` | Clean. `px-3` with conditional `pl-10`/`pr-10` is correctly handled by twMerge. Both wrapper divs are necessary. |
| `src/components/input/inputVariants.ts` | Clean. |
| `src/components/label/Label.tsx` | Clean. |
| `src/components/label/labelVariants.ts` | Clean. |
| `src/components/select/Select.tsx` | Clean. Both wrapper divs are necessary for layout and chevron positioning. |
| `src/components/select/selectVariants.ts` | Clean. |
| `src/components/slider/sliderVariants.ts` | See C1 above. |
| `src/components/switch/Switch.tsx` | Clean — see F1 in switchVariants.ts. |
| `src/components/switch/switchVariants.ts` | See F1 above. |
| `src/components/widgets/color-palette/ColorPalette.tsx` | Clean. `size-(--cell-size)` is valid Tailwind v4 arbitrary value syntax. |
| `src/components/widgets/color-palette/colorPaletteVariants.ts` | Clean. `has-checked:` is valid Tailwind v4 `has-*` variant. |
| `src/components/widgets/sidebar/Sidebar.tsx` | Clean. `group` class is valid. CSS module classes are black-box but well-structured. |
| `src/components/widgets/sidebar/SidebarMain.tsx` | No Tailwind utilities directly. |
| `src/components/widgets/sidebar/sidebarContext.ts` | No JSX. |
| `src/components/widgets/sidebar/useSidebarContext.ts` | No JSX. |
| `src/components/widgets/sidebar/sidebar.module.css` | CSS module — Tailwind `@apply` usage is correct; `@reference` path resolves. Not in scope for cleanup. |

---

## Summary Table

| File | Wrappers | Intra classes | Heritage classes | Flags |
| ---- | -------- | ------------- | ---------------- | ----- |
| App.tsx | 0 | 0 | 0 | 0 |
| main.tsx | 0 | 0 | 0 | 0 |
| cn.ts | 0 | 0 | 0 | 0 |
| useResizeObserver.ts | 0 | 0 | 0 | 0 |
| badge/Badge.tsx | 0 | 0 | 0 | 0 |
| badge/badgeVariants.ts | 0 | 0 | 0 | 0 |
| button/Button.tsx | 0 | 0 | 0 | 0 |
| button/buttonVariants.ts | 0 | 0 | 0 | 0 |
| card/Card.tsx | 0 | 0 | 0 | 0 |
| card/cardVariants.ts | 0 | 0 | 0 | 0 |
| input/Input.tsx | 0 | 0 | 0 | 0 |
| input/inputVariants.ts | 0 | 0 | 0 | 0 |
| label/Label.tsx | 0 | 0 | 0 | 0 |
| label/labelVariants.ts | 0 | 0 | 0 | 0 |
| select/Select.tsx | 0 | 0 | 0 | 0 |
| select/selectVariants.ts | 0 | 0 | 0 | 0 |
| slider/Slider.tsx | 0 | 0 | 0 | 0 |
| slider/sliderVariants.ts | 0 | 1 | 0 | 0 |
| switch/Switch.tsx | 0 | 0 | 0 | 0 |
| switch/switchVariants.ts | 0 | 0 | 0 | 1 |
| ColorPalette.tsx | 0 | 0 | 0 | 0 |
| colorPaletteVariants.ts | 0 | 0 | 0 | 0 |
| Sidebar.tsx | 0 | 0 | 0 | 0 |
| SidebarMain.tsx | 0 | 0 | 0 | 0 |
| SidebarPanel.tsx | 0 | 0 | 0 | 1 |
| SidebarToggle.tsx | 0 | 0 | 0 | 1 |
| sidebar.module.css | 0 | 0 | 0 | 0 |
| **Total** | **0** | **1** | **0** | **3** |

---

## Notes for Review

1. **Minimum cleanup surface.** This package is remarkably clean — most components are leaf exports with no internal composition, so heritage redundancy (B2) is absent and no unnecessary wrappers (B3) exist.

2. **The `w-13` in `switchVariants.ts:16` is the most actionable finding.** It's likely a simple typo for `w-14`. The size progression across small→medium→large is `9 → 11 → 13`, where `13` doesn't exist in Tailwind v4's spacing scale (it goes `0, 0.5, 1, ..., 11, 12, 14, 16, ...`). The correct value is probably `w-14` (3.5rem). Verify before changing.

3. **The `block` class in `sliderVariants.ts:3`** is a minor cleanup — it's a Tailwind default on `<div>` elements. Removing it won't change visual output. Sits in a CVA base string so a standard linter won't flag it.

4. **`sidebar-panel` and `sidebar-toggle` string classes** serve no visible purpose within the package. If no consumers depend on them as styling hooks, they can be safely removed in Pass 2.

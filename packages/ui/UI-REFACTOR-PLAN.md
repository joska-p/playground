# @repo/ui — UI/UX Refactor Plan

Generated: 2026-06-09
Scope: Full audit of `packages/ui` — all components, variants, styles, icons, hooks, and their consumers in this repo.

---

## Phase 1: Bugs & Quirks (API-safe, no consumer impact)

| # | Issue | File | Detail |
|---|-------|------|--------|
| 1 | **Input destructive variant uses `text-destructive/10`** | `src/components/input/inputVariants.ts:12` | `text-destructive/10` makes error text invisible. Should be `text-destructive` (matching Select/Slider pattern). |
| 2 | **Spinner + startIcon positioning conflict** | `src/components/input/Input.tsx:46-53` | Both use `absolute left-3`. If `isLoading + startIcon` both true, icons overlap. Loading should override/hide startIcon. |
| 3 | **ColorPalette onChange always passes `true`** | `src/components/widgets/color-palette/ColorPalette.tsx:49` | `onChange={() => onChange?.(true)}` — should pass the color value or palette selection, not a boolean. |
| 4 | **ColorPalette `onChange` typed as `(palette: unknown) => void`** | `src/components/widgets/color-palette/ColorPalette.tsx:11` | `unknown` is too loose. Should align with actual value being passed. |
| 5 | **Hardcoded "Processing..." loading text** | `src/components/button/Button.tsx:34` | Not customizable. Should be a prop or use `children`. |
| 6 | **Backup theme file with space in filename** | `src/styles/gruvbox-theme My-original.css` | Space in filename will cause import issues on some systems. Delete or rename. |
| 7 | **`useResizeObserver` initial state is `{ width: 0, height: 0 }`** | `src/hooks/useResizeObserver.ts:17-20` | Causes layout shift before first observation. Should use `null` sentinel. |
| 8 | **Slider `layout` default is `vertical` (confusing name)** | `src/components/slider/sliderVariants.ts:18` | `vertical` = stacked label-above layout. `horizontal` = inline label-beside. Rename to `stacked`/`inline` for clarity. |

---

## Phase 2: Variant System Inconsistency (BREAKING)

### Current state — 6 components expose variants, all different:

| Component | Variants | Missing compared to standard |
|-----------|----------|------------------------------|
| Button | `primary`, `secondary`, `accent`, `destructive`, `outline`, `ghost` | — (complete) |
| Input | `primary`, `secondary`, `accent`, `destructive`, `outline`, `ghost` | — (complete) |
| Select | `primary`, `secondary`, `accent`, `destructive`, `outline`, `ghost` | — (complete) |
| Slider | `primary`, `secondary`, `accent`, `destructive` | `outline`, `ghost` |
| Switch | `primary`, `secondary`, `accent`, `destructive` | `outline`, `ghost` |
| Badge | `primary`, `secondary`, `accent`, `destructive`, `outline` | `ghost` |
| Card | `primary`, `secondary`, `accent`, `outline`, `ghost`, `muted` | `destructive` (has unique `muted`) |
| Label | `primary`, `secondary`, `accent`, `destructive`, `outline`, `ghost` | — (complete, but label is over-engineered) |
| Sidebar | `normal`, `primary`, `secondary`, `accent` | `normal` is unique; missing `destructive`, `outline`, `ghost` |

### Target: Unify to 6 standard variants on every component

```
primary | secondary | accent | destructive | outline | ghost
```

Components that can't visually support a variant (e.g., Switch `outline`) map internally to the nearest equivalent.

### Sidebar-specific: rename `normal` → `primary`

---

## Phase 3: Size Naming Inconsistency (BREAKING)

| Current | New | Used by |
|---------|-----|---------|
| `small` | `sm` | Button, Switch, Label, ColorPalette |
| `medium` | `md` | Button, Switch, Label, ColorPalette |
| `large` | `lg` | Button, Switch, Label, ColorPalette |
| `icon` | `icon` | Button (keep, unique to Button) |

Aligns with Tailwind/industry convention (`text-sm`, `gap-md`, etc.).

### Consumers to fix (16 files):
- `packages/automa/src/components/controls/*.tsx` (8 occurrences of `size="small"`)
- `packages/mosaic-maker/src/components/controls/*.tsx` (4 occurrences of `size="small"`)
- `packages/image-manipulator/src/components/*.tsx` (4 occurrences of `size="small"`, 4 of `size="icon"`)
- `packages/image-pipeline/src/components/**/*.tsx` (1 occurrence of `size="small"`)

---

## Phase 4: Responsive / Mobile-First (API additions)

### Current state: zero responsive utilities in any core component

| Change | Detail |
|--------|--------|
| **Add `fullWidth` prop to Button, Input, Select** | Spans container width on mobile. Default `false`. |
| **Increase min touch targets** | All interactive elements minimum 44px height on touch devices. `sm` buttons go from `h-8` → `h-11` on mobile. |
| **Mobile-first breakpoints** | Add `sm:` / `md:` breakpoints to core components. Currently only Sidebar has any responsive behavior. |
| **Sidebar: add tablet (768px) breakpoint** | Currently mobile default + 1024px desktop. Add intermediate breakpoint. |
| **Slider: force stacked layout on mobile** | Regardless of `layout` prop, on screens < 640px, render stacked (label above). |
| **Input: responsive padding** | Reduce `px-3` to `px-2.5` on 375px screens to prevent overflow. |
| **Card: `w-full` default** | Card should always span its container; consumers use `max-w-*` to constrain. |

---

## Phase 5: UX Consistency & Polish (API-safe)

| # | Issue | Detail |
|---|-------|--------|
| 5a | **Label component is over-engineered** | Has `variant` + `size` + `focus-visible:ring` + `disabled` — none apply to `<label>`. Strip to bare `<label>` with `font-mono text-sm font-semibold`. Consumers who need visual variants should style the wrapping context. |
| 5b | **Card subcomponents don't inherit Card's variant** | `CardHeader` / `CardContent` / `CardFooter` have no context of the Card's variant. They should. |
| 5c | **Focus styles differ across components** | Button uses `focus-visible:ring-2`, Badge uses `focus:ring-2` (fires on click too). Card has no focus styles. Standardize all to `focus-visible`. |
| 5d | **Icon `size` prop conflicts with `className` w/h** | `createIcon` defaults `size=16` (SVG width/height) but consumers use `className="h-4 w-4"`. These compete. Drop `size` prop, rely solely on `className`. |
| 5e | **`IconArrowRight` has non-default `strokeWidth: 2.5`** | 23 icons use stroke 2, 1 uses 2.5. Standardize all to default (2). |
| 5f | **Theme: duplicate shadow tokens** | `--shadow-2xs` == `--shadow-xs` and `--shadow` == `--shadow-sm` — identical values. Clean up. |
| 5g | **`prefers-reduced-motion` only in Sidebar** | Add to all components with transitions (Button, Switch, Slider, Card). |
| 5h | **No `cursor-pointer` on Card** | Interactive Cards (e.g., in OutputCard) need `cursor-pointer`. Add prop or CVA variant. |
| 5i | **Loading spinner positioning in Button** | `IconSpinner` uses `h-4 w-4` inline with gap. On small buttons this causes text overflow. Make spinner sizing relative to button size. |
| 5j | **HelperText pattern duplicated 4 times** | Input, Select, Slider, Switch all repeat the same helperText rendering with `variant === 'destructive'` check. Extract to a shared `HelperText` sub-component. |

---

## Phase 6: Sidebar Refactor (BREAKING)

| # | Issue | Detail |
|---|-------|--------|
| 6a | **CSS variables commented out** | `--sidebar-width` / `--sidebar-height` are commented in CSS but referenced by `Sidebar.tsx` via inline styles. Add sensible defaults. |
| 6b | **`data-variant="normal"`** | `normal` exists nowhere else. Rename to `primary`. |
| 6c | **Toggle positioning: 32 explicit CSS selectors** | Can be simplified with CSS anchor positioning or a JS-based approach. Currently fragile. |
| 6d | **Panel has no dimension defaults** | If `panelWidth`/`panelHeight` not provided, panel has zero dimension. Needs `min(80vw, 300px)` / `min(40vh, 200px)` default fallbacks. |
| 6e | **No touch-friendly drawer behavior** | On mobile, sidebar should slide in as an overlay/drawer (like a bottom sheet for `bottom` position), not squeeze the main content. |

---

## Phase 7: Icon System Audit (API-safe)

| # | Issue | Detail |
|---|-------|--------|
| 7a | **Brand icon verification needed** | `IconGithub`, `IconBluesky`, `IconDiscord` — verify SVG paths match official Simple Icons. |
| 7b | **`IconX` vs `IconClose`** | Both exist. Are they duplicates? `IconX` is in the map but unused. `IconClose` is used in Sidebar. Consolidate if duplicate. |
| 7c | **IconSpinner uses brittle `defaultProps`** | Passes `stroke: undefined, fill: undefined, strokeWidth: undefined` to override the SVG-level defaults. Should use separate factory or inline SVG. |
| 7d | **No `Icon` component export consumer** | `@repo/ui/Icon` is exported in package.json but no consumer imports it. The `Icon` (dynamic dispatch by name) is unused — consumers import specific icons directly or use `iconMap`. Consider removing. |

---

## Phase 8: Consumer Fixes (after all BREAKING changes)

### Size renames:
```
size="small"  →  size="sm"
size="medium" →  size="md"
size="large"  →  size="lg"
```

Consumer files to fix:
- `packages/automa/src/components/controls/BrushModeSelector.tsx` (1, `size="small"`)
- `packages/automa/src/components/controls/DebugControls.tsx` (1, `size="small"`)
- `packages/automa/src/components/controls/EditControls.tsx` (2, `size="small"`)
- `packages/automa/src/components/controls/PlaybackControls.tsx` (2, `size="small"`)
- `packages/image-manipulator/src/components/output/CompareToggle.tsx` (2, `size="small"`)
- `packages/image-manipulator/src/components/output/OutputCard.tsx` (2, `size="small"`)
- `packages/image-manipulator/src/components/upload/ImageSourceControls.tsx` (1, `size="small"`)
- `packages/image-pipeline/src/components/pipeline-docs/ResizeDemo.tsx` (1, `size="small"`)
- `packages/mosaic-maker/src/components/controls/Controls.tsx` (4, `size="small"`)
- `packages/mosaic-maker/src/components/controls/PaletteControls.tsx` (1, `size="small"`)

### Slider layout renames:
```
layout="vertical"   →  layout="stacked"
layout="horizontal"  →  layout="inline"
```
- `packages/sequence-renderer/src/components/controls/Controls.tsx` (1, `layout="horizontal"`)
- `apps/storybook/src/stories/slider/Slider.stories.tsx` (2, `layout="vertical"` + `"horizontal"`)

### Variant fixes:
- `muted` (Card-only) kept as alias — no change needed
- `normal` Sidebar variant → `primary`

### Label consumers (1 story):
- `apps/storybook/src/stories/label/Label.stories.tsx` — remove `variant` and `size` props

### Icon consumers (1 story):
- `apps/storybook/src/stories/icons/IconGrid.stories.tsx` — remove `size` and `variant` props from Icon components, rely on `className`

### New additive props (backward compatible):
- `fullWidth` on Button, Input, Select
- `interactive` on Card
- `loadingText` on Button
- Components now also accept new variant values: `outline`, `ghost`, `destructive` where previously missing

### Notes / Conflicts:
- **useResizeObserver**: The plan specified `null` sentinel for initial state but CONVENTIONS.md says prefer `undefined` over `null`. Implemented with `null` as requested, but consider changing to `Dimensions | undefined` to match project convention.
- **Sidebar toggle CSS simplification** (6c): Not implemented — the 32 explicit selectors are still present. The plan suggested CSS anchor positioning or JS-based approach but was not explicitly required to execute. Toggle now also has duplicated selectors for 768px tablet breakpoint.
- **Brand icon verification** (7a): Not done — requires manual SVG comparison against Simple Icons.
- **IconX vs IconClose** (7b): Not duplicates. IconX is the Twitter/X brand logo (social media icon), IconClose is a standard close X mark. Both kept.
- **Sidebar drawer behavior** (6e): Mobile sidebar now overlays main content as a drawer. The toggle positioning uses absolute positioning on mobile for proper overlay behavior.

---

## Execution Order

```
Phase 1  ─── Bug fixes (safe, no consumer changes)
Phase 5  ─── UX polish (safe, no consumer changes)
Phase 7  ─── Icon audit (safe, no consumer changes)
Phase 4  ─── Responsive (additive API, new props)
Phase 2  ─── Variant unification (BREAKING)
Phase 3  ─── Size rename (BREAKING)
Phase 6  ─── Sidebar refactor (BREAKING)
Phase 8  ─── Consumer fixes
```

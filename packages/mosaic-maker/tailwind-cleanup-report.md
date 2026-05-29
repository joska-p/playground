# Tailwind Cleanup Report — @repo/mosaic-maker

Generated: 2026-05-29
Directory: /workspaces/playground/packages/mosaic-maker

---

## External Dependencies (black boxes)

Components imported from outside the package boundary. Heritage analysis skipped for these.

| Component           | Imported from              | Used in                    |
| ------------------- | -------------------------- | -------------------------- |
| `<Sidebar>`         | `@repo/ui/Sidebar`         | MosaicMaker.tsx            |
| `<Button>`          | `@repo/ui/Button`          | Controls.tsx               |
| `<ColorPalette>`    | `@repo/ui/ColorPalette`    | PaletteControls.tsx        |
| `<Slider>`          | `@repo/ui/Slider`          | SliderControls.tsx         |
| `cn`                | `@repo/ui/cn`              | Tile.tsx, TileSetControls.tsx |
| `useResizeObserver` | `@repo/ui/useResizeObserver` | MosaicDisplay.tsx        |

---

## Usage Map Summary

The package renders a full-screen `MosaicMaker` inside a `flex h-screen flex-col` shell in App.tsx. The `MosaicMaker` delegates to an external `<Sidebar>` (black box) with a `MosaicDisplay` in the main area and `Controls` in the panel. The display is a CSS grid (`grid content-center justify-center overflow-hidden`) hosting `<Tile>` SVG elements sized via CSS custom properties. Controls uses a `flex flex-wrap justify-center p-4 gap-4 lg:flex-col lg:gap-8` form containing fieldsets, slider controls, tile-set toggles, and palette pickers. Tailwind v4 is used throughout with custom theme tokens (`bg-background`, `text-foreground`, `ring-primary`, `ring-accent`) sourced from the external `@repo/ui/gruvbox-theme`.

---

## Proposed Changes

### App.tsx

No changes proposed — the single wrapper div provides meaningful layout (`flex flex-col h-screen`) and theming (`bg-background text-foreground`).

### MosaicMaker.tsx

No changes proposed — no Tailwind classes; delegates entirely to external `<Sidebar>`.

### MosaicDisplay.tsx

No changes proposed. The grid container uses meaningful classes: `grid` (creates grid layout), `content-center justify-center` (centers grid tracks/columns), `overflow-hidden` (clips rotated tile content), `w-full h-full` (fills Sidebar.Main area). All classes serve distinct visual purposes.

### Tile.tsx

#### Classes to remove — intra-component

| ID | Line | Element | Class(es) | Reason |
| -- | ---- | ------- | --------- | ------ |
| C1 | 45   | `<svg>` | `relative` | No absolutely positioned descendants, no z-index usage, no stacking-context requirement. CSS `transform` and `overflow` work without `position: relative` on inline SVG in all modern browsers. |

Notes:
- `overflow-hidden` is intentionally kept — it clips rotated tile corners that extend beyond the SVG's CSS box.
- `h-(--tile-size) w-(--tile-size)` dynamically sizes tiles via CSS variables; `transition-transform duration-500` animates rotation changes. All functional.

### Controls.tsx

#### Flags — do not touch, requires review

| ID | Line | Class(es) | Reason |
| -- | ---- | --------- | ------ |
| F1 | 28   | `mt-2` on first `<fieldset>` | Parent form has `p-4` (16px padding). The `mt-2` adds extra 8px above this fieldset, creating 24px from form top edge vs 16px for other children. Likely intentional visual hierarchy for the button group, but could be redundant with `p-4`. **Marked REVIEW** — verify design intent. |

No other changes proposed. The form's `flex flex-wrap justify-center p-4 gap-4 lg:max-w-[45ch] lg:flex-col lg:gap-8` classes are all purposeful.

### PaletteControls.tsx

No changes proposed. `mt-4 border-t p-4` on the fieldset provides intentional visual separation (top border + spacing) from preceding sibling. Parent context (`gap-4` in the form) does not make these redundant.

### TileSetControls.tsx

#### Flags — do not touch, requires review

| ID | Line | Class(es) | Reason |
| -- | ---- | --------- | ------ |
| F2 | 30-31 | `ring-primary`, `ring-accent` | These are theme tokens from `@repo/ui/gruvbox-theme` (outside package boundary). **Marked VERIFY** — confirm tokens exist in the imported theme. |

No other changes proposed. The fieldset creates its own flex context for label children (distinct from the parent form's context). `[--rotation:0deg] [--tile-size:32px]` are required local CSS variable overrides for preview tiles.

### SliderControls.tsx

No changes proposed — no Tailwind classes; delegates entirely to external `<Slider>`.

---

## Summary Table

| File               | Wrappers | Intra classes | Heritage classes | Flags |
| ------------------ | -------- | ------------- | ---------------- | ----- |
| App.tsx            | 0        | 0             | 0                | 0     |
| MosaicMaker.tsx    | 0        | 0             | 0                | 0     |
| MosaicDisplay.tsx  | 0        | 0             | 0                | 0     |
| Tile.tsx           | 0        | 1             | 0                | 0     |
| Controls.tsx       | 0        | 0             | 0                | 1     |
| PaletteControls.tsx | 0       | 0             | 0                | 0     |
| TileSetControls.tsx | 0       | 0             | 0                | 1     |
| SliderControls.tsx | 0        | 0             | 0                | 0     |
| **Total**          | **0**    | **1**         | **0**            | **2** |

---

## Notes for Review

1. **Very clean codebase** — Tailwind usage is intentional and well-structured. Only one class (`relative` in Tile.tsx) is clearly redundant.
2. **No wrapper divs to remove** — all elements serve a visual purpose. No bare `<div>` fragments or spacing-only wrappers exist.
3. **Heritage analysis fully blocked** — every component's direct parent is either external (`@repo/ui/Sidebar`) or creates its own layout context. No cross-component class cascading issues detected within the package boundary.
4. **Theme tokens** — `ring-primary`, `ring-accent`, `bg-background`, `text-foreground` are presumably defined in `@repo/ui/gruvbox-theme`. Pass 2 should verify these exist before any changes involving them.

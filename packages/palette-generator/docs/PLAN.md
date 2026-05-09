# Plan — Palette Generator Refactor

> Tracking file for the ongoing refactor. Update as we go.

## Session End — 2026-05-08

Next step: **UX refinement of the Controls**. We agreed to revisit the look and feel of the scheme selector, dynamic params, and generate flow. After that, Phase 3 (multi-color pinning and interpolation).

---

## Phase 1: Foundation ✓

- [x] Extract generation functions to `core/paletteGenerators.ts`
- [x] State-only store with standalone actions (mosaic-maker pattern)
- [x] Fix infinite render loop (individual selectors, no inline objects)
- [x] Fix ColorPicker (position relative, remove inert, ImageData canvas)
- [x] Add palette delete/clear and empty state
- [x] Restructure folder layout to match mosaic-maker conventions

## Phase 2: Correct Color Theory ✓

- [x] Research and document color harmony schemes
- [x] Create `docs/COLOR-THEORY.md` with formulas
- [x] Rewrite `core/paletteGenerators.ts`:
  - [x] `generatePalette` — unified function with scheme switching
  - [x] `generateHues` — produces base hues per scheme formula
  - [x] `varyLightness` — spreads lightness for monochromatic
  - [x] `interpolatePalette` — gradient between pinned colors
- [x] Redesign `Controls.tsx`:
  - [x] Scheme type button group (Mono, Analogous, Complementary, Split-C, Triadic, Tetradic)
  - [x] Dynamic params panel (count, angle, lightnessSpread)
  - [x] Single "Generate" button
- [x] Delete unused `PaletteGeneratorForm.tsx`
- [x] Verify typecheck, lint, build
- [x] Committed `db9cf77`

## Phase 3: Multi-Color Input (next)

- [ ] Pin system in store (`pinnedColors`, `pinColor`, `unpinColor`)
- [ ] ColorPicker pinned swatches strip
- [ ] Interpolation mode in Controls

# Session 10: README rewrites — palette-generator + palette-engine

## Context

You are continuing a series of package README rewrites for the Creative
Playground monorepo. Each session rewrites one or two READMEs using the Atlas
Explorer voice defined in `drafts/PLAN.md`.

**Read these files first:**
- `drafts/PLAN.md` — Phase 2 template, tone rules, creative packages table
- `packages/palette-generator/README.md` — 55-line React UI for color palette generation and editing
- `packages/palette-engine/README.md` — 17-line pure-engine README for color space math and harmony rules
- `packages/sequence-renderer/README.md` — reference for voice and two-package split handling (just completed)
- `packages/sequence-engine/README.md` — reference for pure-engine README voice (just completed)

## Scope

Rewrite two READMEs:

**`packages/palette-generator/README.md`** (55 lines) — React UI layer. Color palette generation and manipulation tool. Provides controls for picking base colors, applying harmony rules, and previewing generated palettes. Ships a `PaletteGenerator` component with `Controls` and `Display` sub-components, plus a Zustand store with per-slice selectors.

**`packages/palette-engine/README.md`** (17 lines) — Pure color math engine. Defines color spaces (OKLab, OKLCh, HSL, sRGB) and harmony rules (analogous, complementary, monochromatic, triadic). Provides `generatePalette(baseColor, rule) => Palette`. Depends on `colorjs.io` only — no React, no DOM.

## Key characteristics

- Two-package split: `palette-engine` (pure color math, no UI) and `palette-generator` (React layer)
- `palette-engine` provides `colorSpaces`, `generatePalette`, and four built-in harmony rules
- `palette-generator` ships: `PaletteGenerator` component, `Controls` with `ColorSpaceControls` (×4), `ColorSpaceCanvas`, `Slider`, `Display`
- Zustand store with selector hooks (`usePaletteBaseColor`, `usePalettePalettes`) and mutation functions (`setPaletteBaseColor`, `addPalette`)
- `palette-engine` depends on `colorjs.io` for color space conversions
- The component tree: `PaletteGenerator` → `Controls` + `Display`

## Template (from PLAN.md)

[Same template as previous sessions — frontmatter, blockquote, Essence, Quick Launch, Field Notes, body sections]

## Instructions

1. Read all the files listed above
2. Rewrite both READMEs using the template and voice
3. For each file:
- Add frontmatter (title, coordinates, status "Active", date_discovered)
- Write evocative blockquote
- Write Essence (concept-first, why it exists)
- Write Quick Launch with install commands
- Write Field Notes (Catalyst, Quirks, Future Horizons)
- Restructure existing Architecture/Exports/State Management sections into Atlas Explorer body prose
- Preserve technical content (color spaces, harmony rules, component tree, store pattern) as reference material
- `palette-engine` should emphasize the color-space-agnostic rule model and the `colorjs.io` dependency
- `palette-generator` should emphasize the control/display split and the color-picking experience
4. Preserve the footer _Part of the Creative Playground (...) line in both files
5. Cross-reference between the two: `palette-generator` links to `palette-engine`, `palette-engine` can link back

## Validation

pnpm sync-package-docs

## Progress tracking

After completing, update drafts/PLAN.md checklist:
- Mark Session 10 as done
- Produce the new prompt for Session 11 (image-to-particles README)

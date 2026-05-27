# Mosaic Maker — Convention Violations

All rules quoted from `/workspaces/playground/CONVENTIONS.md`.

---

## 1. `src/index.tsx`

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Move `MosaicMaker` component into its own `MosaicMaker.tsx` file, then delete this barrel file. |
| **Filename must match the primary exported identifier** (case-sensitive). | Primary export is `MosaicMaker` but file is named `index.tsx`. |

---

## 2. `src/App.tsx`

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Imports `{ MosaicMaker }` from `"./index"` which is a barrel; change to `"./MosaicMaker"` after extraction. |

---

## 3. `src/utils/styleUtils.ts`

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Exports `computeNumberOfTiles` and `updateElementStyles`; rename file to match one of them (e.g. `computeNumberOfTiles.ts` or `updateElementStyles.ts`) or split into separate files. |

---

## 4. `src/utils/utils.ts`

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Exports `shuffleArray`, `shuffleObject`, `getRandom`, `safeFetch`, `stall`, `getRandomValue`; none match filename `utils`. Split into single-export files or rename to match one export. |

---

## 5. `src/utils/paletteUtils.ts`

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Exports `arePalettesEqual` and `getPaletteId`; rename file to match one of them (e.g. `getPaletteId.ts`) or split. |

---

## 6. `src/utils/fetchPalettes.ts`

| Rule | What needs to change |
|---|---|
| **Zod schema files** `camelCase.schema.ts` | Defines `paletteSchema` inline; extract to `fetchPalettes.schema.ts`. |

---

## 7. `src/core/tileRegistry.ts`

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Primary export is `TILE_REGISTRY` but filename is `tileRegistry`. Rename file to `TILE_REGISTRY.ts` or re-export with matching name. |

---

## 8. `src/core/config.ts`

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Exports `CSS_VARS`, `initialPalette`, `initialTileSet`, types `Palette`, `TileSet`, `TileNames` etc.; none match filename `config`. Split into feature-specific files or rename to match a primary export. |

---

## 9. `src/components/tiles/Tile.tsx`

| Rule | What needs to change |
|---|---|
| **Props types** `XxxProps`, co-located with component | Export type is `Props` instead of `TileProps`. |

---

## 10. `src/components/controls/SliderControls.tsx`

| Rule | What needs to change |
|---|---|
| **Props types** `XxxProps`, co-located with component | Export type is `Props` instead of `SliderControlsProps`. |

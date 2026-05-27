# Mosaic Maker — Convention Violations

All rules quoted from `/workspaces/playground/CONVENTIONS.md`.

---

## 1. `src/index.tsx` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Moved `MosaicMaker` component into its own `MosaicMaker.tsx` file. Barrel file `index.tsx` emptied. |
| **Filename must match the primary exported identifier** (case-sensitive). | `MosaicMaker.tsx` now matches the `MosaicMaker` export. |

---

## 2. `src/App.tsx` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Import changed from `"./index"` to `"./MosaicMaker"`. |

---

## 3. `src/utils/styleUtils.ts` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Split into `computeNumberOfTiles.ts` and `updateElementStyles.ts`. The old file is emptied. |

---

## 4. `src/utils/utils.ts` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Split into 6 single-export files: `shuffleArray.ts`, `shuffleObject.ts`, `getRandom.ts`, `safeFetch.ts`, `stall.ts`, `getRandomValue.ts`. The old file is emptied. |

---

## 5. `src/utils/paletteUtils.ts` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Split into `getPaletteId.ts` and `arePalettesEqual.ts`. The old file is emptied. |

---

## 6. `src/utils/fetchPalettes.ts` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Zod schema files** `camelCase.schema.ts` | Schema extracted to `fetchPalettes.schema.ts`. `fetchPalettes.ts` imports it from the new file. |

---

## 7. `src/core/tileRegistry.ts` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Renamed to `TILE_REGISTRY.ts` to match the primary `TILE_REGISTRY` export. The old file is emptied. |

---

## 8. `src/core/config.ts` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Filename must match the primary exported identifier** (case-sensitive). | Split into feature-specific files: `cssVars.ts`, `constants.ts`, `initialPalette.ts`, `initialTileSet.ts`. The old file is emptied. |

---

## 9. `src/components/tiles/Tile.tsx` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Props types** `XxxProps`, co-located with component | Renamed from `Props` to `TileProps`. |

---

## 10. `src/components/controls/SliderControls.tsx` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **Props types** `XxxProps`, co-located with component | Renamed from `Props` to `SliderControlsProps`. |

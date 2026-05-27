# Mosaic Maker — Convention Violations

All rules quoted from `/workspaces/playground/CONVENTIONS.md`.

---

## 1. `src/index.tsx` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Moved `MosaicMaker` component into its own `MosaicMaker.tsx` file. Barrel file `index.tsx` emptied. Updated `App.tsx` import from `"./index"` to `"./MosaicMaker"`. |
| **Filename must match the primary exported identifier** (case-sensitive). | `MosaicMaker.tsx` now matches the `MosaicMaker` export. |

---

## 2. `src/App.tsx` — ✅ RESOLVED

| Rule | What needs to change |
|---|---|
| **No barrel files (`index.ts`).** Import directly from the source file. | Import changed from `"./index"` to `"./MosaicMaker"`. Verified: import is correct. |

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

---

## 11. Barrel `@repo/ui` imports in consumer files — ✅ RESOLVED

7 consumer files imported from `"@repo/ui"` barrel instead of subpath exports. Updated to subpath imports:

| File | Old | New |
|---|---|---|
| `MosaicMaker.tsx` | `"@repo/ui"` (Sidebar) | `"@repo/ui/Sidebar"` |
| `Controls.tsx` | `"@repo/ui"` (Button) | `"@repo/ui/Button"` |
| `PaletteControls.tsx` | `"@repo/ui"` (ColorPalette) | `"@repo/ui/ColorPalette"` |
| `SliderControls.tsx` | `"@repo/ui"` (Slider) | `"@repo/ui/Slider"` |
| `TileSetControls.tsx` | `"@repo/ui"` (cn) | `"@repo/ui/cn"` |
| `MosaicDisplay.tsx` | `"@repo/ui"` (useResizeObserver) | `"@repo/ui/useResizeObserver"` |
| `Tile.tsx` | `"@repo/ui"` (cn) | `"@repo/ui/cn"` |

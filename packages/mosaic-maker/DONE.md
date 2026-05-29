# mosaic-maker — Refactor TODO

> Issues found during code review, ordered by impact.

## Bugs

- [x] **"New tiles" button doesn't work** — `regenerateMosaicTiles` no longer has the early-return guard (already fixed), verify it works end-to-end.
- [x] **`cycleMosaicPalettes` no-ops on empty stock** — `updateCurrentPalettes` slices from `paletteStock` without checking length. If palettes haven't loaded yet, clicking "New palettes" does nothing silently.

## Dead / empty files

- [x] **Remove empty files** — `paletteUtils.ts`, `styleUtils.ts`, `utils.ts`, `index.tsx` are all empty (0 lines). Delete them.
- [x] **Remove unused exports** — `initialGapSize`, `initialTileSize` in `core/constants.ts` are just aliases for `defaultGapSize`/`defaultTileSize`. Check if anything imports them directly.

## Store structure

- [x] **Split `mosaicStore.ts`** — monolithic file mixes type definitions, store creation, selectors, and actions. Proposal:
  - `store/types.ts` → `TileInstance`, `MosaicState`
  - `store/store.ts` → `mosaicStore` (the `create()` call only)
  - `store/actions.ts` → all exported functions (`regenerateMosaicTiles`, `toggleTileInSet`, `applyMosaicPalette`, etc.)
  - `store/selectors.ts` → `useMosaicTiles`, `useMosaicRef`, `useMosaicCurrentPalette`, etc.
- [x] **Move non-store logic out of store** — `generateTileColors`, `generateTileRotation`, `computeInitialTiles` are pure functions, not store logic. Move to `utils/` or `core/`.

## Utils sprawl

- [x] **Collapse one-liner utils** — these are each their own file but are tiny:
  - `getRandom.ts` + `getRandomValue.ts` → merge into one
  - `shuffleArray.ts` + `shuffleObject.ts` → are both used? if not, remove unused
  - `stall.ts` → is it used? (not imported anywhere in src/)
- [x] **Delete `paletteUtils.ts`, `styleUtils.ts`, `utils.ts`** — empty catch-all files invite dumping.
- [x] **Rename `safeFetch.ts`** → `fetchWithValidation.ts` or similar — `safeFetch` doesn't describe that it validates with zod.

## Component structure

- [x] **Flatten single-file directories** — `mosaic-display/MosaicDisplay.tsx` and `tiles/Tile.tsx` each live in a directory with one file. Move them up to `components/`:

  ```
  components/
    Controls/
      Controls.tsx
      PaletteControls.tsx
      TileSetControls.tsx
      SliderControls.tsx
    MosaicDisplay.tsx
    MosaicMaker.tsx
    Tile.tsx
  ```

  Or keep flat and just put everything in `components/` directly.

- [x] **`MosaicDisplay.tsx` calls `setMosaicRef` + `regenerateMosaicTiles` in a `useEffect`** — this fires every time `dimensions` change, which triggers a full regeneration on every resize. Consider debouncing or only updating when the tile count would actually change.

## Naming / conventions

- [x] **`applyMosaicPalette` vs `regenerateMosaicTiles`** — the former is prefixed `apply`, the latter `regenerate`. Pick one verb convention. `setMosaicRef` and `toggleTileInSet` use different verbs too. This is fine for now but worth standardising as the API grows.
- [x] **`CSS_VARS` has `width` and `height` pointing to the same var `--tile-size`** — this is intentional (square tiles), but the naming suggests they could differ. If tiles are always square, collapse to one property.

## Potential issues

- [x] **`generateTileColors` picks random palette slot references** — tiles get random `--color-N` values, meaning when the palette changes, all tiles change color. This makes "New tiles" + "New palettes" interactions confusing. Consider whether tiles should snapshot actual color values instead.
- [x] **`shuffleArray` mutates in place** — `array.sort()` is destructive. `shuffleObject` calls it and creates a new object, but the original array passed in is still sorted. Currently safe because the input is `Object.values()` of a fresh object, but fragile.
- [x] **`MosaicDisplay.tsx` `useEffect` depends on `mosaicRef`** — `mosaicRef` is a `RefObject`, which is stable across renders, so this dep is noise. `dimensions.width` and `dimensions.height` are the real triggers.

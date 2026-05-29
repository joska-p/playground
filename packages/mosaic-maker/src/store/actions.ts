import { MAX_NUMBER_OF_PALETTES } from "../core/constants";
import type { Palette } from "../core/initialPalette";
import type { TileNames } from "../core/initialTileSet";
import { computeInitialTiles } from "../utils/tiles/computeInitialTiles";
import { fetchPalettes } from "../utils/palettes/fetchPalettes";
import { updateElementStyles } from "../utils/updateElementStyles";
import { mosaicStore } from "./store";

export function regenerateMosaicTiles() {
  const { mosaicRef, tileSet } = mosaicStore.getState();
  if (!mosaicRef.current) return;
  mosaicStore.setState({ tiles: computeInitialTiles(mosaicRef.current, tileSet) });
}

function updateCurrentPalettes() {
  const { paletteStock, currentPalettesIndex } = mosaicStore.getState();
  const newIndex =
    currentPalettesIndex >= paletteStock.length - MAX_NUMBER_OF_PALETTES
      ? 0
      : currentPalettesIndex + MAX_NUMBER_OF_PALETTES;
  const currentPalettes = paletteStock.slice(newIndex, newIndex + MAX_NUMBER_OF_PALETTES);
  mosaicStore.setState({ currentPalettesIndex: newIndex, currentPalettes });
}

export function setMosaicPaletteStock(palettes: Palette[]) {
  const currentPalettes = palettes.slice(0, MAX_NUMBER_OF_PALETTES);
  mosaicStore.setState({ paletteStock: palettes, currentPalettes });
}

export function setMosaicRef(ref: React.RefObject<HTMLDivElement | null>) {
  mosaicStore.setState({ mosaicRef: ref });
  regenerateMosaicTiles();
}

export function applyMosaicPalette(palette: Palette) {
  mosaicStore.setState({ currentPalette: palette });
  const { mosaicRef } = mosaicStore.getState();
  if (mosaicRef.current) {
    updateElementStyles(mosaicRef.current, palette);
  }
}

export function toggleTileInSet(tileName: TileNames) {
  const { tileSet } = mosaicStore.getState();
  if (tileSet.length === 1 && tileName === tileSet[0]) return;
  const newTileSet = tileSet.includes(tileName)
    ? tileSet.filter((tile) => tile !== tileName)
    : [...tileSet, tileName];
  mosaicStore.setState({ tileSet: newTileSet });
  regenerateMosaicTiles();
}

export function cycleMosaicPalettes() {
  updateCurrentPalettes();
}

export async function initMosaicPalettes() {
  const palettes = await fetchPalettes();
  setMosaicPaletteStock(palettes);
}

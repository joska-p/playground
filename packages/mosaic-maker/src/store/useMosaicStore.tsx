import { create } from "zustand";
import type { TileSet, Palette, TileNames } from "../core/config.js";
import {
  initialPalette,
  initialTileSet,
  MAX_NUMBER_OF_PALETTES,
  initialRotations,
} from "../core/config.js";
import { fetchPalettes } from "../utils/fetch-palettes.js";
import { computeNumberOfTiles, updateElementStyles } from "../utils/style-utils.js";
import { getRandom } from "../utils/utils.js";

export interface TileInstance {
  id: string;
  name: TileNames;
  colors: [string, string, string, string, string];
  rotation: string;
}

interface MosaicState {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  paletteStock: Palette[];
  currentPalettesIndex: number;
  currentPalette: Palette;
  currentPalettes: Palette[];
  tileSet: TileSet;
  tiles: TileInstance[];
}

function generateTileColors(): [string, string, string, string, string] {
  const paletteKeys = ["--color-0", "--color-1", "--color-2", "--color-3", "--color-4"];
  return Array.from({ length: 5 }, () => getRandom(paletteKeys)) as [
    string,
    string,
    string,
    string,
    string,
  ];
}

function generateTileRotation(): string {
  const rotationKeys = Object.keys(initialRotations);
  return getRandom(rotationKeys);
}

function computeInitialTiles(
  mosaicRef: React.RefObject<HTMLDivElement | null>,
  tileSet: TileSet
): TileInstance[] {
  if (!mosaicRef.current) return [];
  const numberOfTiles = computeNumberOfTiles(mosaicRef.current);
  return Array.from({ length: numberOfTiles }, (_, i) => ({
    id: `${i}-${Math.random().toString(36).substr(2, 9)}`,
    name: getRandom(tileSet),
    colors: generateTileColors(),
    rotation: generateTileRotation(),
  }));
}

const useMosaicStore = create<MosaicState>()(() => ({
  mosaicRef: { current: null },
  paletteStock: [],
  currentPalettesIndex: 0,
  currentPalette: initialPalette,
  currentPalettes: [],
  tileSet: [...initialTileSet],
  tiles: [],
}));

function _updateTiles() {
  const { mosaicRef, tileSet } = useMosaicStore.getState();
  useMosaicStore.setState({ tiles: computeInitialTiles(mosaicRef, tileSet) });
}

function updateCurrentPalettes() {
  const { paletteStock, currentPalettesIndex } = useMosaicStore.getState();
  const newIndex =
    currentPalettesIndex >= paletteStock.length - MAX_NUMBER_OF_PALETTES
      ? 0
      : currentPalettesIndex + MAX_NUMBER_OF_PALETTES;
  const currentPalettes = paletteStock.slice(newIndex, newIndex + MAX_NUMBER_OF_PALETTES);
  useMosaicStore.setState({ currentPalettesIndex: newIndex, currentPalettes });
}

function setPaletteStock(palettes: Palette[]) {
  const currentPalettes = palettes.slice(0, MAX_NUMBER_OF_PALETTES);
  useMosaicStore.setState({ paletteStock: palettes, currentPalettes });
}

function setMosaicRef(ref: React.RefObject<HTMLDivElement | null>) {
  useMosaicStore.setState({ mosaicRef: ref });
  _updateTiles();
}

function updatePalette(palette: Palette) {
  useMosaicStore.setState({ currentPalette: palette });
  const { mosaicRef } = useMosaicStore.getState();
  if (mosaicRef.current) {
    updateElementStyles(mosaicRef.current, palette);
  }
}

function updateTileSet(tileName: TileNames) {
  const { tileSet } = useMosaicStore.getState();
  if (tileSet.length === 1 && tileName === tileSet[0]) return;
  const newTileSet = tileSet.includes(tileName)
    ? tileSet.filter((tile) => tile !== tileName)
    : [...tileSet, tileName];
  useMosaicStore.setState({ tileSet: newTileSet });
  _updateTiles();
}

function updateTiles() {
  _updateTiles();
}

async function initPalettes() {
  const palettes = await fetchPalettes();
  setPaletteStock(palettes);
}

export {
  useMosaicStore,
  updateCurrentPalettes,
  setPaletteStock,
  setMosaicRef,
  updatePalette,
  updateTileSet,
  updateTiles,
  initPalettes,
};

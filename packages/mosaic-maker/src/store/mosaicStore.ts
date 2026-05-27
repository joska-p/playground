import { create } from "zustand";
import { initialRotations, MAX_NUMBER_OF_PALETTES } from "../core/constants";
import type { Palette } from "../core/initialPalette";
import { initialPalette } from "../core/initialPalette";
import type { TileNames, TileSet } from "../core/initialTileSet";
import { initialTileSet } from "../core/initialTileSet";
import { computeNumberOfTiles } from "../utils/computeNumberOfTiles";
import { fetchPalettes } from "../utils/fetchPalettes";
import { getRandom } from "../utils/getRandom";
import { updateElementStyles } from "../utils/updateElementStyles";

export type TileInstance = {
  id: string;
  name: TileNames;
  colors: [string, string, string, string, string];
  rotation: string;
};

type MosaicState = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  paletteStock: Palette[];
  currentPalettesIndex: number;
  currentPalette: Palette;
  currentPalettes: Palette[];
  tileSet: TileSet;
  tiles: TileInstance[];
};

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
    id: `${i}-${Math.random().toString(36).substring(2, 12)}`,
    name: getRandom(tileSet),
    colors: generateTileColors(),
    rotation: generateTileRotation(),
  }));
}

const mosaicStore = create<MosaicState>(() => ({
  mosaicRef: { current: null },
  paletteStock: [],
  currentPalettesIndex: 0,
  currentPalette: initialPalette,
  currentPalettes: [],
  tileSet: [...initialTileSet],
  tiles: [],
}));

function _updateTiles() {
  const { mosaicRef, tileSet } = mosaicStore.getState();
  mosaicStore.setState({ tiles: computeInitialTiles(mosaicRef, tileSet) });
}

export function useMosaicRef(): React.RefObject<HTMLDivElement | null> {
  return mosaicStore((s) => s.mosaicRef);
}

export function useMosaicTiles(): TileInstance[] {
  return mosaicStore((s) => s.tiles);
}

export function useMosaicCurrentPalette(): Palette {
  return mosaicStore((s) => s.currentPalette);
}

export function useMosaicCurrentPalettes(): Palette[] {
  return mosaicStore((s) => s.currentPalettes);
}

export function useMosaicTileSet(): TileSet {
  return mosaicStore((s) => s.tileSet);
}

export function useMosaicPaletteStock(): Palette[] {
  return mosaicStore((s) => s.paletteStock);
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
  _updateTiles();
}

export function updateMosaicPalette(palette: Palette) {
  mosaicStore.setState({ currentPalette: palette });
  const { mosaicRef } = mosaicStore.getState();
  if (mosaicRef.current) {
    updateElementStyles(mosaicRef.current, palette);
  }
}

export function updateMosaicTileSet(tileName: TileNames) {
  const { tileSet } = mosaicStore.getState();
  if (tileSet.length === 1 && tileName === tileSet[0]) return;
  const newTileSet = tileSet.includes(tileName)
    ? tileSet.filter((tile) => tile !== tileName)
    : [...tileSet, tileName];
  mosaicStore.setState({ tileSet: newTileSet });
  _updateTiles();
}

export function updateMosaicTiles() {
  _updateTiles();
}

export function updateMosaicCurrentPalettes() {
  updateCurrentPalettes();
}

export async function initMosaicPalettes() {
  const palettes = await fetchPalettes();
  setMosaicPaletteStock(palettes);
}

import type { Palette } from "../core/initialPalette";
import type { TileSet } from "../core/initialTileSet";
import { mosaicStore } from "./store";
import type { TileInstance } from "./types";

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

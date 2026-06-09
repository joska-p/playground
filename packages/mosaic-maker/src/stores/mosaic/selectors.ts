import type { TileSet } from '../../core/initialTileSet';
import type { Palette } from '../../core/palette.schema';
import { mosaicStore } from './store';
import type { TileInstance } from './types';

export function useMosaicRef(): React.RefObject<HTMLDivElement | null> {
  return mosaicStore((s) => s.mosaicRef);
}

export function useTiles(): TileInstance[] {
  return mosaicStore((s) => s.tiles);
}

export function useCurrentPalette(): Palette {
  return mosaicStore((s) => s.currentPalette);
}

export function useCurrentPalettes(): Palette[] {
  return mosaicStore((s) => s.currentPalettes);
}

export function useTileSet(): TileSet {
  return mosaicStore((s) => s.tileSet);
}

export function useIsPalettesLoading(): boolean {
  return mosaicStore((s) => s.isPalettesLoading);
}

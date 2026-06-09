import { mosaicStore } from '../store';
import type { TileInstance } from '../types';

export function useTiles(): TileInstance[] {
  return mosaicStore((s) => s.tiles);
}

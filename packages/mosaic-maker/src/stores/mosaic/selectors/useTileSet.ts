import type { TileSet } from '../../../core/initialTileSet';
import { mosaicStore } from '../store';

export function useTileSet(): TileSet {
  return mosaicStore((s) => s.tileSet);
}

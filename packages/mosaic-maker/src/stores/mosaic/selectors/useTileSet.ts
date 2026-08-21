import { mosaicStore } from '../store';

import type { TileSet } from '../../../core/initialTileSet';

export function useTileSet(): TileSet {
    return mosaicStore((s) => s.tileSet);
}

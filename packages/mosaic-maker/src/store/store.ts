import { create } from 'zustand';
import { initialPalette } from '../core/initialPalette';
import { initialTileSet } from '../core/initialTileSet';
import type { MosaicState } from './types';

const mosaicStore = create<MosaicState>(() => ({
  mosaicRef: { current: null },
  paletteStock: [initialPalette],
  currentPalettesIndex: 0,
  currentPalette: initialPalette,
  currentPalettes: [initialPalette],
  tileSet: [...initialTileSet],
  tiles: [],
}));

export { mosaicStore };

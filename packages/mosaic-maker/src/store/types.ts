import type { Palette } from '../core/initialPalette';
import type { TileNames, TileSet } from '../core/initialTileSet';

export type TileInstance = {
  id: string;
  name: TileNames;
  colors: [string, string, string, string, string];
  rotation: string;
};

export type MosaicState = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  paletteStock: Palette[];
  currentPalettesIndex: number;
  currentPalette: Palette;
  currentPalettes: Palette[];
  tileSet: TileSet;
  tiles: TileInstance[];
};

import type { Palette } from '../../../core/palette-types';
import { mosaicStore } from '../store';

export function useCurrentPalette(): Palette {
  return mosaicStore((s) => s.currentPalette);
}

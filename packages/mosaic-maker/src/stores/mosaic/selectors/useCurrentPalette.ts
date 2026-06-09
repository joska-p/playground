import type { Palette } from '../../../core/palette.schema';
import { mosaicStore } from '../store';

export function useCurrentPalette(): Palette {
  return mosaicStore((s) => s.currentPalette);
}

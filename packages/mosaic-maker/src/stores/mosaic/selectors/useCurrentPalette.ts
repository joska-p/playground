import type { Palette } from '../../../core/types';
import { mosaicStore } from '../store';

export function useCurrentPalette(): Palette {
  return mosaicStore((s) => s.currentPalette);
}

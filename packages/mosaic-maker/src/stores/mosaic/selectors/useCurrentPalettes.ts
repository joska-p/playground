import type { Palette } from '../../../core/palette-types';
import { mosaicStore } from '../store';

export function useCurrentPalettes(): Palette[] {
  return mosaicStore((s) => s.currentPalettes);
}

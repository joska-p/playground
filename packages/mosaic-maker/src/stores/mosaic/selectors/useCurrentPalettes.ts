import type { Palette } from '../../../core/types';
import { mosaicStore } from '../store';

export function useCurrentPalettes(): Palette[] {
  return mosaicStore((s) => s.currentPalettes);
}

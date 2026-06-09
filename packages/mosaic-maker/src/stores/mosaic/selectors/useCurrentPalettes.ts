import type { Palette } from '../../../core/palette.schema';
import { mosaicStore } from '../store';

export function useCurrentPalettes(): Palette[] {
  return mosaicStore((s) => s.currentPalettes);
}

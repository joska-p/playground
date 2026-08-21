import { mosaicStore } from '../store';

import type { Palette } from '../../../core/types';

export function useCurrentPalettes(): Palette[] {
    return mosaicStore((s) => s.currentPalettes);
}

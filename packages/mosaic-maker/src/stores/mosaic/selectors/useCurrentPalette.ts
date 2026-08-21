import { mosaicStore } from '../store';

import type { Palette } from '../../../core/types';

export function useCurrentPalette(): Palette {
    return mosaicStore((s) => s.currentPalette);
}

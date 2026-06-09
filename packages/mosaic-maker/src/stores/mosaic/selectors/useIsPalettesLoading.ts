import { mosaicStore } from '../store';

export function useIsPalettesLoading(): boolean {
  return mosaicStore((s) => s.isPalettesLoading);
}

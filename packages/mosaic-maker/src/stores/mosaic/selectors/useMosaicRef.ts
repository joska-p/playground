import { mosaicStore } from '../store';

export function useMosaicRef(): React.RefObject<HTMLDivElement | null> {
  return mosaicStore((s) => s.mosaicRef);
}

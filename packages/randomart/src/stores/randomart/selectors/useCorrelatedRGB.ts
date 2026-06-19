import { useSyncExternalStore } from 'react';
import { randomartStore } from '../store';

export function useCorrelatedRGB(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => randomartStore.subscribe(onStoreChange),
    () => randomartStore.getState().correlatedRGB
  );
}

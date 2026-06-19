import { useSyncExternalStore } from 'react';
import { randomartStore } from '../store';

export function useRenderMode(): 'canvas' | 'glsl' {
  return useSyncExternalStore(
    (onStoreChange) => randomartStore.subscribe(onStoreChange),
    () => randomartStore.getState().renderMode
  );
}

import { createContext, useContext } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import type { CAStore } from './types.ts';

type CameraControl = {
  zoomIn: () => void;
  zoomOut: () => void;
  pan: (dx: number, dy: number) => void;
};

const CAStoreContext = createContext<StoreApi<CAStore> | undefined>(undefined);

const cameraControlRef: { current: CameraControl | null } = { current: null };

const useCAStore = (): StoreApi<CAStore> => {
  const store = useContext(CAStoreContext);
  if (store === undefined) {
    throw new Error('useCAStore must be used within AutomatonProvider');
  }
  return store;
};

export { cameraControlRef, CAStoreContext, useCAStore };
export type { CameraControl };

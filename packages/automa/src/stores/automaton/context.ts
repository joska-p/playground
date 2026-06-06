import { createContext, useContext } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import type { CAStore } from './types.ts';

const CAStoreContext = createContext<StoreApi<CAStore> | undefined>(undefined);

const useCAStore = (): StoreApi<CAStore> => {
  const store = useContext(CAStoreContext);
  if (store === undefined) {
    throw new Error('useCAStore must be used within AutomatonProvider');
  }
  return store;
};

export { CAStoreContext, useCAStore };

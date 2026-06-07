import { createContext, useContext } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import type { AutomaStore } from './types.ts';

const AutomaStoreContext = createContext<StoreApi<AutomaStore> | undefined>(
  undefined
);

const useAutomaStore = (): StoreApi<AutomaStore> => {
  const store = useContext(AutomaStoreContext);
  if (store === undefined) {
    throw new Error('useAutomaStore must be used within AutomatonProvider');
  }
  return store;
};

export { AutomaStoreContext, useAutomaStore };

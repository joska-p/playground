import { useEffect, useState, type ReactNode } from 'react';
import { createAutomaStore } from '../stores/automaton/store.ts';
import { AutomaStoreContext } from '../stores/automaton/context.ts';
import type { AutomaStoreInit } from '../stores/automaton/types.ts';
import { ErrorBoundary } from './ErrorBoundary.tsx';

type AutomaProviderProps = {
  rows?: number;
  cols?: number;
  initialDensity?: number;
  seed?: number;
  children: ReactNode;
};

const AutomaProvider = ({
  rows = 100,
  cols = 100,
  initialDensity = 0.2,
  seed,
  children,
}: AutomaProviderProps) => {
  const [store] = useState(() => {
    const resolvedSeed = seed ?? Date.now();
    return createAutomaStore({
      rows,
      cols,
      initialDensity,
      seed: resolvedSeed,
    } satisfies AutomaStoreInit);
  });

  useEffect(() => {
    store.getState().init();
    return () => store.getState().destroy();
  }, [store]);

  return (
    <AutomaStoreContext.Provider value={store}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </AutomaStoreContext.Provider>
  );
};

export { AutomaProvider };
export type { AutomaProviderProps };

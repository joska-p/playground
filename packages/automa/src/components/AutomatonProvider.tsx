import { useEffect, useState, type ReactNode } from 'react';
import { createCAStore } from '../stores/automaton/store.ts';
import { CAStoreContext } from '../stores/automaton/context.ts';
import type { CAStoreInit } from '../stores/automaton/types.ts';
import { ErrorBoundary } from './ErrorBoundary.tsx';

type CAProviderProps = {
  rows?: number;
  cols?: number;
  initialDensity?: number;
  seed?: number;
  children: ReactNode;
};

const AutomatonProvider = ({
  rows = 100,
  cols = 100,
  initialDensity = 0.2,
  seed,
  children,
}: CAProviderProps) => {
  const [store] = useState(() => {
    const resolvedSeed = seed ?? Date.now();
    return createCAStore({
      rows,
      cols,
      initialDensity,
      seed: resolvedSeed,
    } satisfies CAStoreInit);
  });

  useEffect(() => {
    store.getState().init();
    return () => store.getState().destroy();
  }, [store]);

  return (
    <CAStoreContext.Provider value={store}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </CAStoreContext.Provider>
  );
};

export { AutomatonProvider };
export type { CAProviderProps };

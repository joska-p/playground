import type { SimulationEngine } from './SimulationEngine';

let engine: SimulationEngine | null = null;
let pendingInit: (() => void) | null = null;
let lastInit: (() => void) | null = null;

export const setEngine = (e: SimulationEngine | null): void => {
  const prev = engine;
  engine = e;
  try {
    if (e && e !== prev && pendingInit) {
      pendingInit();
      pendingInit = null;
    } else if (e && e !== prev && lastInit) {
      lastInit();
    }
  } catch (err) {
    console.error('Engine initialization callback failed:', err);
  }
};

export const getEngine = (): SimulationEngine | null => engine;

export const onEngineReady = (fn: () => void): void => {
  lastInit = fn;
  if (engine) {
    fn();
  } else {
    pendingInit = fn;
  }
};

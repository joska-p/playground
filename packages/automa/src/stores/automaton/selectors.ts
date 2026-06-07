import { useStore } from 'zustand';
import { useAutomaStore } from './context.ts';
import type { BrushMode } from './types.ts';
import type { Grid } from '../../core/types.ts';

const useRunning = (): boolean => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.running);
};

const useSpeedMs = (): number => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.speedMs);
};

const useBrushMode = (): BrushMode => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.toolMode);
};

const useGeneration = (): number => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.generation);
};

const useShowDebug = (): boolean => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.showDebug);
};

const useCols = (): number => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.cols);
};

const useRows = (): number => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.rows);
};

const useGrid = (): Grid => {
  const store = useAutomaStore();
  return useStore(store, (s) => s.grid);
};

export {
  useBrushMode,
  useCols,
  useGeneration,
  useGrid,
  useRows,
  useRunning,
  useShowDebug,
  useSpeedMs,
};

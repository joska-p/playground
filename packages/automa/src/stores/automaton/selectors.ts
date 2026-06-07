import { useStore } from 'zustand';
import { useCAStore } from './context.ts';
import type { Grid } from '../../core/types.ts';
import type { ToolMode } from './types.ts';

const useRunning = (): boolean => {
  const store = useCAStore();
  return useStore(store, (s) => s.running);
};

const useSpeedMs = (): number => {
  const store = useCAStore();
  return useStore(store, (s) => s.speedMs);
};

const useToolMode = (): ToolMode => {
  const store = useCAStore();
  return useStore(store, (s) => s.toolMode);
};

const useGeneration = (): number => {
  const store = useCAStore();
  return useStore(store, (s) => s.generation);
};

const useShowDebug = (): boolean => {
  const store = useCAStore();
  return useStore(store, (s) => s.showDebug);
};

const useCols = (): number => {
  const store = useCAStore();
  return useStore(store, (s) => s.cols);
};

const useRows = (): number => {
  const store = useCAStore();
  return useStore(store, (s) => s.rows);
};

const useGrid = (): Grid => {
  const store = useCAStore();
  return useStore(store, (s) => s.grid);
};

export {
  useCols,
  useGeneration,
  useGrid,
  useRows,
  useRunning,
  useShowDebug,
  useSpeedMs,
  useToolMode,
};

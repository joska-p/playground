import { useStore } from 'zustand';
import { useCAStore } from './context.ts';
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

export { useGeneration, useRunning, useShowDebug, useSpeedMs, useToolMode };

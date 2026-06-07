import { useStore } from 'zustand';
import { uiStore } from './store.ts';

const useRunning = () => useStore(uiStore, (s) => s.running);

const useSpeedMs = () => useStore(uiStore, (s) => s.speedMs);

const useBrushMode = () => useStore(uiStore, (s) => s.toolMode);

const useShowDebug = () => useStore(uiStore, (s) => s.showDebug);

const useAliveColor = () => useStore(uiStore, (s) => s.aliveColor);

const useGlowColor = () => useStore(uiStore, (s) => s.glowColor);

const useDeadColor = () => useStore(uiStore, (s) => s.deadColor);

export {
  useAliveColor,
  useBrushMode,
  useDeadColor,
  useGlowColor,
  useRunning,
  useShowDebug,
  useSpeedMs,
};

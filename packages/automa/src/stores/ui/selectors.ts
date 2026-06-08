import { useStore } from 'zustand';
import { uiStore } from './store.ts';

const useRunning = () => useStore(uiStore, (s) => s.running);

const useSpeedMs = () => useStore(uiStore, (s) => s.speedMs);

const useBrushMode = () => useStore(uiStore, (s) => s.toolMode);

const useShowDebug = () => useStore(uiStore, (s) => s.showDebug);

const useStateColors = () => useStore(uiStore, (s) => s.stateColors);

const useGlowColor = () => useStore(uiStore, (s) => s.glowColor);

export {
  useBrushMode,
  useGlowColor,
  useRunning,
  useShowDebug,
  useSpeedMs,
  useStateColors,
};

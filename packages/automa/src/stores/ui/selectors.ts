import { useStore } from 'zustand';
import { uiStore } from './store.ts';

const useRunning = () => useStore(uiStore, (s) => s.running);

const useSpeedMs = () => useStore(uiStore, (s) => s.speedMs);

const useBrushMode = () => useStore(uiStore, (s) => s.toolMode);

const useShowDebug = () => useStore(uiStore, (s) => s.showDebug);

export { useBrushMode, useRunning, useShowDebug, useSpeedMs };

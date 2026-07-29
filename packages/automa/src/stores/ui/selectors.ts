import { useStore } from 'zustand';
import { uiStore } from './store';

const useBrushMode = () => useStore(uiStore, (s) => s.toolMode);
const usePaletteBrush = () => useStore(uiStore, (s) => s.paletteBrush);
const useRunning = () => useStore(uiStore, (s) => s.running);
const useShowDebug = () => useStore(uiStore, (s) => s.showDebug);
const useSpeedMs = () => useStore(uiStore, (s) => s.speedMs);
const useStateColors = () => useStore(uiStore, (s) => s.stateColors);

export { useBrushMode, usePaletteBrush, useRunning, useShowDebug, useSpeedMs, useStateColors };

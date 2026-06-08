import type { BrushMode } from './store.ts';
import { uiStore } from './store.ts';

const setRunning = (v: boolean): void => {
  uiStore.setState({ running: v });
};

const setSpeedMs = (ms: number): void => {
  uiStore.setState({ speedMs: ms });
};

const setToolMode = (mode: BrushMode): void => {
  uiStore.setState({ toolMode: mode });
};

const setShowDebug = (v: boolean): void => {
  uiStore.setState({ showDebug: v });
};

const setStateColor = (index: number, color: string): void => {
  uiStore.setState((s) => {
    const next = [...s.stateColors];
    next[index] = color;
    return { stateColors: next };
  });
};

const setGlowColor = (color: string): void => {
  uiStore.setState({ glowColor: color });
};

const setShader = (id: string): void => {
  uiStore.setState({ shaderId: id });
};

export {
  setGlowColor,
  setRunning,
  setShader,
  setShowDebug,
  setSpeedMs,
  setStateColor,
  setToolMode,
};

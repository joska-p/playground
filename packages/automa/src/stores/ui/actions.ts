import type { BrushMode } from './store.ts';
import { uiStore } from './store.ts';

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

const setPaletteBrush = (id: string | null): void => {
  uiStore.setState({ paletteBrush: id });
};

export {
  setGlowColor,
  setPaletteBrush,
  setShader,
  setShowDebug,
  setStateColor,
  setToolMode,
};

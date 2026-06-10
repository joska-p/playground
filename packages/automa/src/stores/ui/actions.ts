import type { BrushMode } from './store';
import { uiStore } from './store';

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

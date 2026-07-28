import type { BrushMode } from './store';
import { uiStore } from './store';

const setToolMode = (mode: BrushMode): void => {
  uiStore.setState({ toolMode: mode });
};

const setStateColor = (index: number, color: string): void => {
  uiStore.setState((s) => {
    const next = [...s.stateColors];
    next[index] = color;
    return { stateColors: next };
  });
};

const setShowDebug = (showDebug: boolean): void => {
  uiStore.setState({ showDebug });
};

const setPaletteBrush = (id: string | null): void => {
  uiStore.setState({ paletteBrush: id });
};

export { setPaletteBrush, setShowDebug, setStateColor, setToolMode };

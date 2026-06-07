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

export { setRunning, setShowDebug, setSpeedMs, setToolMode };

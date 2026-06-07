import { createStore } from 'zustand/vanilla';
import { SPEED_DEFAULT_MS } from '../../config.ts';

export type BrushMode = 'draw' | 'erase';

type UiState = {
  running: boolean;
  speedMs: number;
  toolMode: BrushMode;
  showDebug: boolean;
};

const uiStore = createStore<UiState>(() => ({
  running: false,
  speedMs: SPEED_DEFAULT_MS,
  toolMode: 'draw' as const,
  showDebug: false,
}));

export { uiStore };
export type { UiState };

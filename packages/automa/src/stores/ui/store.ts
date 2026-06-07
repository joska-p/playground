import { createStore } from 'zustand/vanilla';

export type BrushMode = 'draw' | 'erase';

type UiState = {
  running: boolean;
  speedMs: number;
  toolMode: BrushMode;
  showDebug: boolean;
};

const uiStore = createStore<UiState>(() => ({
  running: false,
  speedMs: 100,
  toolMode: 'draw' as const,
  showDebug: false,
}));

export { uiStore };
export type { UiState };

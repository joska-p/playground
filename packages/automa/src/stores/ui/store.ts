import { createStore } from 'zustand/vanilla';
import { DEFAULT_STATE_COLORS, SPEED_DEFAULT_MS } from '../../config';

export type BrushMode = 'draw' | 'erase';

type UiState = {
  running: boolean;
  speedMs: number;
  toolMode: BrushMode;
  showDebug: boolean;
  stateColors: string[];
  paletteBrush: string | null;
};

const uiStore = createStore<UiState>(() => ({
  running: false,
  speedMs: SPEED_DEFAULT_MS,
  toolMode: 'draw' as const,
  showDebug: false,
  stateColors: [...DEFAULT_STATE_COLORS],
  paletteBrush: null
}));

export { uiStore };

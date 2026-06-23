import {
  COLOR_GLOW,
  DEFAULT_STATE_COLORS,
  SPEED_DEFAULT_MS
} from '@repo/automa-engine/config';
import { createStore } from 'zustand/vanilla';

export type BrushMode = 'draw' | 'erase';

type UiState = {
  running: boolean;
  speedMs: number;
  toolMode: BrushMode;
  showDebug: boolean;
  stateColors: string[];
  glowColor: string;
  shaderId: string;
  paletteBrush: string | null;
};

const uiStore = createStore<UiState>(() => ({
  running: false,
  speedMs: SPEED_DEFAULT_MS,
  toolMode: 'draw' as const,
  showDebug: false,
  stateColors: [...DEFAULT_STATE_COLORS],
  glowColor: COLOR_GLOW,
  shaderId: 'glow',
  paletteBrush: null
}));

export { uiStore };

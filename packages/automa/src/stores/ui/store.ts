import { createStore } from 'zustand/vanilla';
import {
  COLOR_ALIVE,
  COLOR_DEAD,
  COLOR_GLOW,
  SPEED_DEFAULT_MS,
} from '../../config.ts';

export type BrushMode = 'draw' | 'erase';

type UiState = {
  running: boolean;
  speedMs: number;
  toolMode: BrushMode;
  showDebug: boolean;
  aliveColor: string;
  glowColor: string;
  deadColor: string;
};

const uiStore = createStore<UiState>(() => ({
  running: false,
  speedMs: SPEED_DEFAULT_MS,
  toolMode: 'draw' as const,
  showDebug: false,
  aliveColor: COLOR_ALIVE,
  glowColor: COLOR_GLOW,
  deadColor: COLOR_DEAD,
}));

export { uiStore };
export type { UiState };

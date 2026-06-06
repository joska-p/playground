import type { Pattern } from '../../engine/pattern.schema.ts';
import type { CellValue, Grid } from '../../engine/types.ts';

type ToolMode = 'draw' | 'erase' | 'pan';

type UISlice = {
  running: boolean;
  speedMs: number;
  toolMode: ToolMode;
  showDebug: boolean;
};

type SimSlice = {
  grid: Grid;
  backBuffer: Grid;
  generation: number;
  cols: number;
  rows: number;
  seed: number;
};

type CAStoreInit = {
  rows: number;
  cols: number;
  initialDensity: number;
  seed: number;
};

type CAState = UISlice & SimSlice;

type CAStoreActions = {
  init: () => void;
  play: () => void;
  pause: () => void;
  step: () => void;
  clear: () => void;
  toggleRunning: () => void;
  randomize: (density?: number) => void;
  setSpeed: (ms: number) => void;
  setToolMode: (mode: ToolMode) => void;
  paintCell: (index: number, value: CellValue) => void;
  importPattern: (raw: unknown) => void;
  exportPattern: (name: string) => Pattern;
  destroy: () => void;
};

type CAStore = CAState & CAStoreActions;

export type {
  CAStore,
  CAStoreActions,
  CAStoreInit,
  CAState,
  SimSlice,
  ToolMode,
  UISlice,
};

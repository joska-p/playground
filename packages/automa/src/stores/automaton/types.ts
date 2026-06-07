import type { Pattern } from '../../core/pattern.schema.ts';
import type { CellValue, Grid } from '../../core/types.ts';

type BrushMode = 'draw' | 'erase';

type UIState = {
  running: boolean;
  speedMs: number;
  toolMode: BrushMode;
  showDebug: boolean;
};

type SimulationState = {
  grid: Grid;
  backBuffer: Grid;
  generation: number;
  cols: number;
  rows: number;
  seed: number;
};

type AutomaStoreInit = {
  rows: number;
  cols: number;
  initialDensity: number;
  seed: number;
};

type AutomaStat = UIState & SimulationState;

type AutomaStoreActions = {
  init: () => void;
  play: () => void;
  pause: () => void;
  step: () => void;
  clear: () => void;
  toggleRunning: () => void;
  randomize: (density?: number) => void;
  setSpeed: (ms: number) => void;
  setToolMode: (mode: BrushMode) => void;
  paintCell: (index: number, value: CellValue) => void;
  importPattern: (raw: unknown) => void;
  exportPattern: (name: string) => Pattern;
  destroy: () => void;
};

type AutomaStore = AutomaStat & AutomaStoreActions;

export type {
  BrushMode,
  AutomaStore,
  AutomaStoreActions,
  AutomaStoreInit,
  AutomaStat,
  SimulationState,
  UIState,
};

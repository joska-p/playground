import { createStore } from 'zustand/vanilla';
import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_ROWS,
  GRID_DEFAULT_SEED
} from '../../core/config';
import { createGrid } from '../../core/grid';
import type { Grid } from '../../core/types';

type SimulationState = {
  grid: Grid;
  backBuffer: Grid;
  generation: number;
  cols: number;
  rows: number;
  seed: number;
  ruleId: string;
};

const simulationStore = createStore<SimulationState>(() => ({
  grid: createGrid(GRID_DEFAULT_ROWS, GRID_DEFAULT_COLS),
  backBuffer: createGrid(GRID_DEFAULT_ROWS, GRID_DEFAULT_COLS),
  generation: 0,
  cols: GRID_DEFAULT_COLS,
  rows: GRID_DEFAULT_ROWS,
  seed: GRID_DEFAULT_SEED,
  ruleId: 'conway'
}));

export { simulationStore };

import { createStore } from 'zustand/vanilla';
import { createGrid } from '../../core/grid.ts';
import type { Grid } from '../../core/types.ts';
import {
  GRID_DEFAULT_ROWS,
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_SEED,
} from '../../config.ts';

type SimulationState = {
  grid: Grid;
  backBuffer: Grid;
  generation: number;
  cols: number;
  rows: number;
  seed: number;
};

const simulationStore = createStore<SimulationState>(() => ({
  grid: createGrid(GRID_DEFAULT_ROWS, GRID_DEFAULT_COLS),
  backBuffer: createGrid(GRID_DEFAULT_ROWS, GRID_DEFAULT_COLS),
  generation: 0,
  cols: GRID_DEFAULT_COLS,
  rows: GRID_DEFAULT_ROWS,
  seed: GRID_DEFAULT_SEED,
}));

export { simulationStore };
export type { SimulationState };

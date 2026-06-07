import { createStore } from 'zustand/vanilla';
import { createGrid } from '../../core/grid.ts';
import type { Grid } from '../../core/types.ts';

type SimulationState = {
  grid: Grid;
  backBuffer: Grid;
  generation: number;
  cols: number;
  rows: number;
  seed: number;
};

const simulationStore = createStore<SimulationState>(() => ({
  grid: createGrid(100, 100),
  backBuffer: createGrid(100, 100),
  generation: 0,
  cols: 100,
  rows: 100,
  seed: 42,
}));

export { simulationStore };
export type { SimulationState };

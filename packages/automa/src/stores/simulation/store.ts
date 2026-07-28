import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_ROWS,
  GRID_DEFAULT_SEED
} from '@repo/automa-engine/config';
import { createStore } from 'zustand/vanilla';

type SimulationState = {
  generation: number;
  cols: number;
  rows: number;
  seed: number;
  ruleId: string;
};

const simulationStore = createStore<SimulationState>(() => ({
  generation: 0,
  cols: GRID_DEFAULT_COLS,
  rows: GRID_DEFAULT_ROWS,
  seed: GRID_DEFAULT_SEED,
  ruleId: 'conway'
}));

export { simulationStore };

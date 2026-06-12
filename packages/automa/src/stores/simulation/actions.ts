import { WorkerPool } from '@repo/worker-pool';
import {
  GRID_DEFAULT_DENSITY,
  WORKER_MESSAGE_STEP,
  getDefaultStateColor
} from '../../core/config';
import type { Creature } from '../../core/creature/types';
import { createGrid, seedGrid } from '../../core/grid';
import { getRule } from '../../core/rules/registry';
import type { CellValue } from '../../core/types';
import { uiStore } from '../ui/store';
import { simulationStore } from './store';

type SimulationInit = {
  rows: number;
  cols: number;
  initialDensity: number;
  seed: number;
};

type StepRequest = {
  type: typeof WORKER_MESSAGE_STEP;
  grid: Uint8Array;
  cols: number;
  rows: number;
  ruleId: string;
};

type StepResponse = {
  type: typeof WORKER_MESSAGE_STEP;
  grid: Uint8Array;
};

const pool = new WorkerPool<StepRequest, StepResponse>({
  maxPoolSize: 1,
  workerFactory: () =>
    new Worker(new URL('../../core/worker', import.meta.url), {
      type: 'module'
    }),
  serialize: (task) => ({
    message: task,
    transfer: [task.grid.buffer]
  }),
  deserialize: (event) => {
    const data = event.data as StepResponse;
    return { ok: true, value: data };
  }
});

const init = (opts: SimulationInit): void => {
  const grid = createGrid(opts.rows, opts.cols);
  seedGrid(grid, opts.initialDensity, opts.seed);

  simulationStore.setState({
    grid,
    backBuffer: createGrid(opts.rows, opts.cols),
    cols: opts.cols,
    rows: opts.rows,
    seed: opts.seed,
    generation: 0
  });
};

const destroy = (): void => {
  pool.teardown();
};

const step = async (): Promise<void> => {
  const state = simulationStore.getState();
  const response = await pool.run({
    type: WORKER_MESSAGE_STEP,
    grid: state.grid,
    cols: state.cols,
    rows: state.rows,
    ruleId: state.ruleId
  });
  simulationStore.setState({
    grid: response.grid,
    generation: state.generation + 1
  });
};

const setRule = (ruleId: string): void => {
  simulationStore.setState({ ruleId });

  const rule = getRule(ruleId);
  if (!rule) return;

  const { stateColors } = uiStore.getState();
  if (rule.stateCount > stateColors.length) {
    const next = [...stateColors];
    for (let i = stateColors.length; i < rule.stateCount; i++) {
      next[i] = getDefaultStateColor(i);
    }
    uiStore.setState({ stateColors: next });
  }
};

const play = async (): Promise<void> => {
  uiStore.setState({ running: true });
  while (uiStore.getState().running) {
    await step();
    await new Promise((r) => setTimeout(r, uiStore.getState().speedMs));
  }
};

const pause = (): void => {
  uiStore.setState({ running: false });
};

const toggleRunning = (): void => {
  if (uiStore.getState().running) {
    pause();
  } else {
    play();
  }
};

const setSpeed = (ms: number): void => {
  uiStore.setState({ speedMs: ms });
};

const clear = (): void => {
  const state = simulationStore.getState();
  state.grid.fill(0);
  simulationStore.setState({ generation: state.generation + 1 });
};

const randomize = (density?: number): void => {
  const state = simulationStore.getState();
  seedGrid(state.grid, density ?? GRID_DEFAULT_DENSITY, state.seed);
  simulationStore.setState({ generation: state.generation + 1 });
};

const paintCell = (index: number, value: CellValue): void => {
  const state = simulationStore.getState();
  if (index >= 0 && index < state.grid.length) {
    state.grid[index] = value;
    simulationStore.setState({ generation: state.generation + 1 });
  }
};

// Place an entire creature pattern centered on (col, row)
const placePattern = (col: number, row: number, creature: Creature): void => {
  const state = simulationStore.getState();
  const grid = state.grid;
  const ccols = state.cols;
  const rrows = state.rows;

  const offsetX = Math.floor(creature.width / 2);
  const offsetY = Math.floor(creature.height / 2);

  let changed = false;
  for (let y = 0; y < creature.height; y++) {
    for (let x = 0; x < creature.width; x++) {
      const val = creature.cells[y][x];
      if (!val) continue;
      const gx = col - offsetX + x;
      const gy = row - offsetY + y;
      if (gx < 0 || gx >= ccols || gy < 0 || gy >= rrows) continue;
      grid[gy * ccols + gx] = val as CellValue;
      changed = true;
    }
  }

  if (changed) {
    simulationStore.setState({ generation: state.generation + 1 });
  }
};

export {
  clear,
  destroy,
  init,
  paintCell,
  placePattern,
  randomize,
  setRule,
  setSpeed,
  step,
  toggleRunning
};

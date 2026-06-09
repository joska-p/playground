import {
  GRID_DEFAULT_DENSITY,
  WORKER_MESSAGE_STEP,
  getDefaultStateColor,
} from '../../core/config.ts';
import type { Creature } from '../../core/creature/types.ts';
import { createGrid, seedGrid } from '../../core/grid.ts';
import { getRule } from '../../core/rules/registry.ts';
import type { CellValue, Grid } from '../../core/types.ts';
import { uiStore } from '../ui/store.ts';
import { simulationStore } from './store.ts';

type SimulationInit = {
  rows: number;
  cols: number;
  initialDensity: number;
  seed: number;
};

let worker: Worker | undefined;
let intervalId: ReturnType<typeof setInterval> | undefined;

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

const init = (opts: SimulationInit): void => {
  const grid = createGrid(opts.rows, opts.cols);
  seedGrid(grid, opts.initialDensity, opts.seed);

  simulationStore.setState({
    grid,
    backBuffer: createGrid(opts.rows, opts.cols),
    cols: opts.cols,
    rows: opts.rows,
    seed: opts.seed,
    generation: 0,
  });

  worker = new Worker(new URL('../../core/worker.ts', import.meta.url), {
    type: 'module',
  });

  worker.onmessage = (e: MessageEvent<StepResponse>) => {
    if (e.data.type !== WORKER_MESSAGE_STEP) return;
    const state = simulationStore.getState();
    simulationStore.setState({
      grid: e.data.grid,
      generation: state.generation + 1,
    });
  };
};

const destroy = (): void => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
  if (worker) {
    worker.terminate();
    worker = undefined;
  }
};

const step = (): void => {
  if (!worker) return;
  const state = simulationStore.getState();
  worker.postMessage(
    {
      type: WORKER_MESSAGE_STEP,
      grid: state.grid,
      cols: state.cols,
      rows: state.rows,
      ruleId: state.ruleId,
    } satisfies StepRequest,
    [state.grid.buffer]
  );
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

const play = (): void => {
  uiStore.setState({ running: true });
  intervalId = setInterval(step, uiStore.getState().speedMs);
};

const pause = (): void => {
  uiStore.setState({ running: false });
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
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
  if (uiStore.getState().running) {
    pause();
    play();
  }
};

const setGrid = (grid: Grid): void => {
  const state = simulationStore.getState();
  simulationStore.setState({ grid, generation: state.generation + 1 });
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
  pause,
  placePattern,
  play,
  randomize,
  setGrid,
  setRule,
  setSpeed,
  step,
  toggleRunning,
};

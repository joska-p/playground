import { createGrid, seedGrid } from '../../core/grid.ts';
import { patternSchema } from '../../core/pattern.schema.ts';
import type { Pattern } from '../../core/pattern.schema.ts';
import type { CellValue, Grid } from '../../core/types.ts';
import type { AutomaStoreInit } from '../types.ts';
import { simulationStore } from './store.ts';
import { uiStore } from '../ui/store.ts';

let worker: Worker | undefined;
let intervalId: ReturnType<typeof setInterval> | undefined;

type StepRequest = {
  type: 'step';
  grid: Uint8Array;
  cols: number;
  rows: number;
};

type StepResponse = {
  type: 'step';
  grid: Uint8Array;
};

const init = (opts: AutomaStoreInit): void => {
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
    if (e.data.type !== 'step') return;
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
      type: 'step',
      grid: state.grid,
      cols: state.cols,
      rows: state.rows,
    } satisfies StepRequest,
    [state.grid.buffer]
  );
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
  seedGrid(state.grid, density ?? 0.2, state.seed);
  simulationStore.setState({ generation: state.generation + 1 });
};

const paintCell = (index: number, value: CellValue): void => {
  const state = simulationStore.getState();
  if (index >= 0 && index < state.grid.length) {
    state.grid[index] = value;
    simulationStore.setState({ generation: state.generation + 1 });
  }
};

const importPattern = (raw: unknown): void => {
  const result = patternSchema.safeParse(raw);
  if (!result.success) {
    console.error('Pattern validation failed:', result.error);
    return;
  }
  const pattern = result.data;
  const state = simulationStore.getState();
  state.grid.fill(0);
  for (const idx of pattern.aliveCells) {
    if (idx < state.grid.length) state.grid[idx] = 1;
  }
  simulationStore.setState({ generation: state.generation + 1 });
};

const exportPattern = (name: string): Pattern => {
  const state = simulationStore.getState();
  const aliveCells: number[] = [];
  for (let i = 0; i < state.grid.length; i++) {
    if (state.grid[i] === 1) aliveCells.push(i);
  }
  return {
    name,
    cols: state.cols,
    rows: state.rows,
    generation: state.generation,
    aliveCells,
  };
};

export {
  clear,
  destroy,
  exportPattern,
  importPattern,
  init,
  paintCell,
  pause,
  play,
  randomize,
  setGrid,
  setSpeed,
  step,
  toggleRunning,
};

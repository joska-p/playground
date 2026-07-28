import { GRID_DEFAULT_DENSITY } from '@repo/automa-engine/config';
import type { Creature } from '@repo/automa-engine/creature/types';
import { createGrid, seedGrid } from '@repo/automa-engine/grid';
import { getRule } from '@repo/automa-engine/rules/registry';
import type { CellValue } from '@repo/automa-engine/types';
import { getEngine, onEngineReady } from '../../core/gpu/engine-ref';
import { uiStore } from '../ui/store';
import { simulationStore } from './store';

type SimulationInit = {
  rows: number;
  cols: number;
  initialDensity: number;
  seed: number;
};

const init = (opts: SimulationInit): void => {
  const grid = createGrid(opts.rows, opts.cols);
  seedGrid(grid, opts.initialDensity, opts.seed);

  onEngineReady(() => {
    const engine = getEngine();
    if (!engine) return;
    engine.resize(opts.cols, opts.rows);
    engine.init(grid);
  });

  simulationStore.setState({
    cols: opts.cols,
    rows: opts.rows,
    seed: opts.seed,
    generation: 0
  });
};

const destroy = (): void => {
  // engine lifecycle is managed by CellMesh
};

const step = (): void => {
  const state = simulationStore.getState();
  const rule = getRule(state.ruleId);
  const engine = getEngine();
  if (!engine) return;
  engine.step(rule);
  simulationStore.setState({ generation: state.generation + 1 });
};

const setRule = (ruleId: string): void => {
  simulationStore.setState({ ruleId });

  const rule = getRule(ruleId);
  const { stateColors } = uiStore.getState();
  if (rule.stateCount > stateColors.length) {
    const next = [...stateColors];
    for (let i = stateColors.length; i < rule.stateCount; i++) {
      next[i] = '#000000';
    }
    uiStore.setState({ stateColors: next });
  }
};

const play = async (): Promise<void> => {
  uiStore.setState({ running: true });
  while (uiStore.getState().running) {
    step();
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
    void play();
  }
};

const setSpeed = (ms: number): void => {
  uiStore.setState({ speedMs: ms });
};

const clear = (): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = simulationStore.getState();
  const empty = new Uint8Array(state.cols * state.rows);
  engine.init(empty);
  simulationStore.setState({ generation: state.generation + 1 });
};

const randomize = (density?: number): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = simulationStore.getState();
  const grid = createGrid(state.rows, state.cols);
  seedGrid(grid, density ?? GRID_DEFAULT_DENSITY, state.seed);
  engine.init(grid);
  simulationStore.setState({ generation: state.generation + 1 });
};

const paintCell = (col: number, row: number, value: CellValue): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = simulationStore.getState();
  const brushSize = 0.5 / Math.max(state.cols, state.rows);
  engine.paint(col / state.cols, row / state.rows, brushSize, value);
  simulationStore.setState({ generation: state.generation + 1 });
};

const placePattern = (col: number, row: number, creature: Creature): void => {
  const engine = getEngine();
  if (!engine) return;

  const state = simulationStore.getState();
  const offsetX = Math.floor(creature.width / 2);
  const offsetY = Math.floor(creature.height / 2);
  const brushSize = 0.5 / Math.max(state.cols, state.rows);

  let changed = false;
  for (let y = 0; y < creature.height; y++) {
    const rowCells = creature.cells[y];
    if (!rowCells) continue;
    for (let x = 0; x < creature.width; x++) {
      const val = rowCells[x];
      if (!val) continue;
      const gx = col - offsetX + x;
      const gy = row - offsetY + y;
      if (gx < 0 || gx >= state.cols || gy < 0 || gy >= state.rows) continue;
      engine.paint(gx / state.cols, gy / state.rows, brushSize, val);
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

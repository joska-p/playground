import {
  GRID_DEFAULT_COLS,
  GRID_DEFAULT_DENSITY,
  GRID_DEFAULT_ROWS,
  GRID_DEFAULT_SEED
} from '@repo/automa-engine/config';
import type { Creature } from '@repo/automa-engine/creature/types';
import { createGrid, seedGrid } from '@repo/automa-engine/grid';
import { getRule } from '@repo/automa-engine/rules/registry';
import type { CellValue } from '@repo/automa-engine/types';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { getEngine, onEngineReady } from '../engine/registry';
import { DEFAULT_STATE_COLORS, SPEED_DEFAULT_MS } from '../lib/constants';

// --- Types ---

export type BrushMode = 'draw' | 'erase';

type AutomaState = {
  generation: number;
  cols: number;
  rows: number;
  seed: number;
  ruleId: string;
  running: boolean;
  speedMs: number;
  toolMode: BrushMode;
  showDebug: boolean;
  stateColors: string[];
  paletteBrush: string | null;
};

// --- Store ---

const automaStore = createStore<AutomaState>(() => ({
  generation: 0,
  cols: GRID_DEFAULT_COLS,
  rows: GRID_DEFAULT_ROWS,
  seed: GRID_DEFAULT_SEED,
  ruleId: 'conway',
  running: false,
  speedMs: SPEED_DEFAULT_MS,
  toolMode: 'draw' as const,
  showDebug: false,
  stateColors: [...DEFAULT_STATE_COLORS],
  paletteBrush: null
}));

// --- Selectors ---

const useCols = () => useStore(automaStore, (s) => s.cols);
const useGeneration = () => useStore(automaStore, (s) => s.generation);
const useRows = () => useStore(automaStore, (s) => s.rows);
const useRuleId = () => useStore(automaStore, (s) => s.ruleId);
const useBrushMode = () => useStore(automaStore, (s) => s.toolMode);
const usePaletteBrush = () => useStore(automaStore, (s) => s.paletteBrush);
const useRunning = () => useStore(automaStore, (s) => s.running);
const useShowDebug = () => useStore(automaStore, (s) => s.showDebug);
const useSpeedMs = () => useStore(automaStore, (s) => s.speedMs);
const useStateColors = () => useStore(automaStore, (s) => s.stateColors);

// --- Simulation lifecycle ---

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

  automaStore.setState({
    cols: opts.cols,
    rows: opts.rows,
    seed: opts.seed,
    generation: 0
  });
};

const destroy = (): void => {
  playController?.abort();
};

const step = (): void => {
  const state = automaStore.getState();
  const rule = getRule(state.ruleId);
  const engine = getEngine();
  if (!engine) return;
  engine.step(rule);
  automaStore.setState({ generation: state.generation + 1 });
};

const setRule = (ruleId: string): void => {
  automaStore.setState({ ruleId });

  const rule = getRule(ruleId);
  const { stateColors } = automaStore.getState();
  if (rule.stateCount > stateColors.length) {
    const next = [...stateColors];
    for (let i = stateColors.length; i < rule.stateCount; i++) {
      next[i] = '#000000';
    }
    automaStore.setState({ stateColors: next });
  }
};

// --- Grid editing ---

const clear = (): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = automaStore.getState();
  const empty = new Uint8Array(state.cols * state.rows);
  engine.init(empty);
  automaStore.setState({ generation: state.generation + 1 });
};

const randomize = (density?: number): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = automaStore.getState();
  const grid = createGrid(state.rows, state.cols);
  seedGrid(grid, density ?? GRID_DEFAULT_DENSITY, state.seed);
  engine.init(grid);
  automaStore.setState({ generation: state.generation + 1 });
};

const paintCell = (col: number, row: number, value: CellValue): void => {
  const engine = getEngine();
  if (!engine) return;
  const state = automaStore.getState();
  const brushSize = 1.0 / Math.min(state.cols, state.rows);
  engine.paint(col / state.cols, row / state.rows, brushSize, value);
  automaStore.setState({ generation: state.generation + 1 });
};

const placePattern = (col: number, row: number, creature: Creature): void => {
  const engine = getEngine();
  if (!engine) return;

  const state = automaStore.getState();
  const offsetX = Math.floor(creature.width / 2);
  const offsetY = Math.floor(creature.height / 2);
  const brushSize = 1.0 / Math.min(state.cols, state.rows);

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
    automaStore.setState({ generation: state.generation + 1 });
  }
};

// --- Playback ---

let playController: AbortController | null = null;

const play = async (): Promise<void> => {
  playController?.abort();
  playController = new AbortController();
  const { signal } = playController;

  automaStore.setState({ running: true });
  while (automaStore.getState().running && !signal.aborted) {
    step();
    await new Promise((r) => setTimeout(r, automaStore.getState().speedMs));
  }
};

const pause = (): void => {
  automaStore.setState({ running: false });
};

const toggleRunning = (): void => {
  if (automaStore.getState().running) {
    pause();
  } else {
    void play();
  }
};

const setSpeed = (ms: number): void => {
  automaStore.setState({ speedMs: ms });
};

// --- UI actions ---

const setToolMode = (mode: BrushMode): void => {
  automaStore.setState({ toolMode: mode });
};

const setStateColor = (index: number, color: string): void => {
  automaStore.setState((s) => {
    const next = [...s.stateColors];
    next[index] = color;
    return { stateColors: next };
  });
};

const setShowDebug = (showDebug: boolean): void => {
  automaStore.setState({ showDebug });
};

const setPaletteBrush = (id: string | null): void => {
  automaStore.setState({ paletteBrush: id });
};

export {
  automaStore,
  clear,
  destroy,
  init,
  paintCell,
  pause,
  placePattern,
  randomize,
  setPaletteBrush,
  setRule,
  setShowDebug,
  setSpeed,
  setStateColor,
  setToolMode,
  step,
  toggleRunning,
  useBrushMode,
  useCols,
  useGeneration,
  usePaletteBrush,
  useRows,
  useRuleId,
  useRunning,
  useShowDebug,
  useSpeedMs,
  useStateColors
};

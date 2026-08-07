import {
    GRID_DEFAULT_COLS,
    GRID_DEFAULT_DENSITY,
    GRID_DEFAULT_ROWS,
    GRID_DEFAULT_SEED
} from '@repo/automa-engine/config';
import type { Creature, CreatureId } from '@repo/automa-engine/creature/registry';
import { createGrid, seedGrid } from '@repo/automa-engine/grid';
import type { RuleId } from '@repo/automa-engine/rules/registry';
import { rules } from '@repo/automa-engine/rules/registry';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import type { SimulationEngine } from '@repo/automa-engine/gpu/createSimulationEngine';
import { DEFAULT_STATE_COLORS, SPEED_DEFAULT_MS } from '../lib/constants';
import { computeDerivedColors } from '../lib/colors';

// --- Types ---

export type BrushMode = 'draw' | 'erase';

type AutomaState = {
    engine: SimulationEngine | null;
    generation: number;
    cols: number;
    rows: number;
    grid: Uint8Array | null;
    seed: number;
    ruleId: RuleId;
    running: boolean;
    speedMs: number;
    toolMode: BrushMode;
    showDebug: boolean;
    stateColors: string[];
    paletteBrush: CreatureId | 'pixel';
};

// --- Store ---

const automaStore = createStore<AutomaState>(() => ({
    engine: null,
    generation: 0,
    cols: GRID_DEFAULT_COLS,
    rows: GRID_DEFAULT_ROWS,
    grid: null,
    seed: GRID_DEFAULT_SEED,
    ruleId: 'conway',
    running: false,
    speedMs: SPEED_DEFAULT_MS,
    toolMode: 'draw' as const,
    showDebug: false,
    stateColors: [...DEFAULT_STATE_COLORS],
    paletteBrush: 'pixel'
}));

// --- Selectors ---

const useEngine = () => useStore(automaStore, (s) => s.engine);
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

const setEngine = (engine: SimulationEngine | null): void => {
    automaStore.setState({ engine });
};

const init = (opts: SimulationInit): void => {
    const { engine } = automaStore.getState();

    const grid = createGrid(opts.rows, opts.cols);
    seedGrid(grid, opts.initialDensity, opts.seed);

    if (engine) {
        engine.resize(opts.cols, opts.rows);
        engine.init(grid);
    }

    automaStore.setState({
        cols: opts.cols,
        rows: opts.rows,
        seed: opts.seed,
        generation: 0,
        grid
    });
};

const destroy = (): void => {
    playController?.abort();
    const { engine } = automaStore.getState();
    if (engine) {
        engine.destroy();
        automaStore.setState({ engine: null });
    }
};

const step = (): void => {
    const state = automaStore.getState();
    if (!state.engine) return;

    const rule = rules[state.ruleId];
    state.engine.step(rule);
    automaStore.setState({ generation: state.generation + 1 });
};

const setRule = (ruleId: RuleId): void => {
    const rule = rules[ruleId];
    const { stateColors } = automaStore.getState();

    const deadColor = stateColors[0] ?? '#070a14';
    const aliveColor = stateColors[1] ?? '#d97706';

    const nextColors = computeDerivedColors(rule.stateCount, deadColor, aliveColor);

    automaStore.setState({ ruleId, stateColors: nextColors });
};

// --- Grid editing ---

const clear = (): void => {
    const { engine, cols, rows, generation } = automaStore.getState();
    if (!engine) return;

    const empty = new Uint8Array(cols * rows);
    engine.init(empty);
    automaStore.setState({ generation: generation + 1, grid: empty });
};

const randomize = (density?: number): void => {
    const { engine, rows, cols, seed, generation } = automaStore.getState();
    if (!engine) return;

    const grid = createGrid(rows, cols);
    seedGrid(grid, density ?? GRID_DEFAULT_DENSITY, seed);
    engine.init(grid);
    automaStore.setState({ generation: generation + 1, grid });
};

const paintCell = (col: number, row: number, value: number): void => {
    const { engine } = automaStore.getState();
    if (!engine) return;

    engine.paint(col, row, value);
    automaStore.setState((s) => ({ generation: s.generation + 1 }));
};

const placePattern = (col: number, row: number, creature: Creature): void => {
    const { engine, cols, rows, generation } = automaStore.getState();
    if (!engine) return;

    const offsetX = Math.floor(creature.width / 2);
    const offsetY = Math.floor(creature.height / 2);

    let changed = false;
    for (let y = 0; y < creature.height; y++) {
        const rowCells = creature.cells[y];
        if (!rowCells) continue;
        for (let x = 0; x < creature.width; x++) {
            const val = rowCells[x];
            if (!val) continue;
            const gx = col - offsetX + x;
            const gy = row - offsetY + y;
            if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
            engine.paint(gx, gy, val);
            changed = true;
        }
    }

    if (changed) {
        automaStore.setState({ generation: generation + 1 });
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
    playController?.abort();
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
        const deadColor = index === 0 ? color : (s.stateColors[0] ?? '#070a14');
        const aliveColor = index === 1 ? color : (s.stateColors[1] ?? '#d97706');
        const rule = rules[s.ruleId];

        const nextColors = computeDerivedColors(rule.stateCount, deadColor, aliveColor);
        return { stateColors: nextColors };
    });
};

const setShowDebug = (showDebug: boolean): void => {
    automaStore.setState({ showDebug });
};

const setPaletteBrush = (id: CreatureId): void => {
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
    setEngine,
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
    useEngine,
    useGeneration,
    usePaletteBrush,
    useRows,
    useRuleId,
    useRunning,
    useShowDebug,
    useSpeedMs,
    useStateColors
};

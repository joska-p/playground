import { createStore } from 'zustand/vanilla';
import { createGrid, fillRandom } from '../../engine/grid.ts';
import { patternSchema } from '../../engine/pattern.schema.ts';
import type { Pattern } from '../../engine/pattern.schema.ts';
import type { CellValue } from '../../engine/types.ts';
import type { CAStore, CAStoreInit, ToolMode } from './types.ts';

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

const createCAStore = (opts: CAStoreInit) => {
  const grid = createGrid(opts.rows, opts.cols);
  const backBuffer = createGrid(opts.rows, opts.cols);

  let worker: Worker | null = null;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  return createStore<CAStore>()((set, get) => ({
    running: false,
    speedMs: 100,
    toolMode: 'draw' as ToolMode,
    showDebug: false,
    grid,
    backBuffer,
    generation: 0,
    cols: opts.cols,
    rows: opts.rows,
    seed: opts.seed,

    init: () => {
      fillRandom(grid, opts.initialDensity, opts.seed);
      set({ generation: 0 });

      worker = new Worker(new URL('../../engine/worker.ts', import.meta.url), {
        type: 'module',
      });

      worker.onmessage = (e: MessageEvent<StepResponse>) => {
        if (e.data.type !== 'step') return;
        set({ grid: e.data.grid, generation: get().generation + 1 });
      };
    },

    play: () => {
      set({ running: true });
      intervalId = setInterval(() => {
        get().step();
      }, get().speedMs);
    },

    pause: () => {
      set({ running: false });
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },

    step: () => {
      if (worker === null) return;
      const state = get();
      worker.postMessage(
        {
          type: 'step',
          grid: state.grid,
          cols: state.cols,
          rows: state.rows,
        } satisfies StepRequest,
        [state.grid.buffer]
      );
    },

    toggleRunning: () => {
      const state = get();
      if (state.running) {
        get().pause();
      } else {
        get().play();
      }
    },

    clear: () => {
      const state = get();
      state.grid.fill(0);
      set({ generation: state.generation + 1 });
    },

    randomize: (density?: number) => {
      const state = get();
      fillRandom(state.grid, density ?? 0.2, state.seed);
      set({ generation: state.generation + 1 });
    },

    setSpeed: (ms: number) => {
      set({ speedMs: ms });
      const state = get();
      if (state.running) {
        get().pause();
        get().play();
      }
    },

    setToolMode: (mode: ToolMode) => {
      set({ toolMode: mode });
    },

    paintCell: (index: number, value: CellValue) => {
      const state = get();
      if (index >= 0 && index < state.grid.length) {
        state.grid[index] = value;
        set({ generation: state.generation + 1 });
      }
    },

    importPattern: (raw: unknown) => {
      const result = patternSchema.safeParse(raw);
      if (!result.success) {
        console.error('Pattern validation failed:', result.error);
        return;
      }
      const pattern = result.data;
      const state = get();
      state.grid.fill(0);
      for (const idx of pattern.aliveCells) {
        if (idx >= 0 && idx < state.grid.length) {
          state.grid[idx] = 1;
        }
      }
      set({ generation: state.generation + 1 });
    },

    exportPattern: (name: string): Pattern => {
      const state = get();
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
    },

    destroy: () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (worker !== null) {
        worker.terminate();
        worker = null;
      }
    },
  }));
};

export { createCAStore };

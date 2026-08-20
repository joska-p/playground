import type { Creature } from '../creature/registry';
import { createGrid, seedGrid } from '../grid';
import { rules, type RuleId } from '../rules/registry';
import type { StateBuffer } from '@repo/glaze/gpu/StateBuffer';
import {
    GRID_DEFAULT_COLS,
    GRID_DEFAULT_DENSITY,
    GRID_DEFAULT_ROWS,
    GRID_DEFAULT_SEED
} from '../config';
import { SPEED_DEFAULT_MS } from '../../lib/constants';
import { useSyncExternalStore } from 'react';

export type SimState = Readonly<{
    cols: number;
    rows: number;
    generation: number;
    ruleId: RuleId;
    running: boolean;
    speedMs: number;
    density: number;
    seed: number;
}>;

export type InitialConfig = Partial<SimState>;

export class SimulationEngine {
    readonly #buffer: StateBuffer;
    readonly #birthBuffer = new Int32Array(9);
    readonly #surviveBuffer = new Int32Array(9);

    // Encapsulated State
    #state: SimState;
    #playController: AbortController | null = null;
    #listeners = new Set<() => void>();

    constructor(
        buffer: StateBuffer,
        simShaderSource: string,
        paintShaderSource: string,
        initialConfig?: InitialConfig
    ) {
        this.#buffer = buffer;
        buffer.addProgram('default', simShaderSource);
        buffer.addProgram('paint', paintShaderSource);

        this.#state = {
            cols: initialConfig?.cols ?? GRID_DEFAULT_COLS,
            rows: initialConfig?.rows ?? GRID_DEFAULT_ROWS,
            generation: 0,
            ruleId: initialConfig?.ruleId ?? 'conway',
            running: false,
            speedMs: initialConfig?.speedMs ?? SPEED_DEFAULT_MS,
            density: initialConfig?.density ?? GRID_DEFAULT_DENSITY,
            seed: initialConfig?.seed ?? GRID_DEFAULT_SEED
        };

        const grid = createGrid(this.#state.rows, this.#state.cols);
        seedGrid(grid, this.#state.density, this.#state.seed);
        this.#buffer.init(grid);
    }

    // ── Subscription Management ──

    subscribe = (listener: () => void): (() => void) => {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    };

    getSnapshot = (): SimState => {
        return this.#state;
    };

    #notify(): void {
        for (const listener of this.#listeners) {
            listener();
        }
    }

    #updateState(partialState: Partial<SimState>): void {
        this.#state = { ...this.#state, ...partialState };
        this.#notify();
    }

    // ── GPU Shaders (Private) ──

    #gpuStep(rule: {
        birth: readonly boolean[];
        survive: readonly boolean[];
        stateCount: number;
    }): void {
        for (let i = 0; i < 9; i++) {
            this.#birthBuffer[i] = rule.birth[i] ? 1 : 0;
            this.#surviveBuffer[i] = rule.survive[i] ? 1 : 0;
        }
        this.#buffer.useProgram('default');
        this.#buffer.setUniforms({
            u_gridSize: [this.#buffer.width, this.#buffer.height],
            u_birth: this.#birthBuffer,
            u_survive: this.#surviveBuffer,
            u_stateCount: rule.stateCount
        });
        this.#buffer.step();
    }

    #gpuPaint(col: number, row: number, value: number): void {
        this.#buffer.useProgram('paint');
        this.#buffer.setUniforms({
            u_targetCell: [col, row],
            u_value: value
        });
        this.#buffer.step();
    }

    // ── Public Simulation Controls ──

    step(): void {
        const rule = rules[this.#state.ruleId];
        this.#gpuStep(rule);
        this.#updateState({ generation: this.#state.generation + 1 });
    }

    play(): void {
        if (this.#state.running) return;

        this.#playController?.abort();
        this.#playController = new AbortController();
        const { signal } = this.#playController;

        this.#updateState({ running: true });

        const loop = (): void => {
            if (signal.aborted) return;
            this.step();
            setTimeout(loop, this.#state.speedMs);
        };
        loop();
    }

    pause(): void {
        this.#playController?.abort();
        this.#playController = null;
        this.#updateState({ running: false });
    }

    toggleRunning(): void {
        if (this.#state.running) {
            this.pause();
        } else {
            this.play();
        }
    }

    setSpeed(ms: number): void {
        this.#updateState({ speedMs: ms });
    }

    setRule(id: RuleId): void {
        this.#updateState({ ruleId: id });
    }

    reinit(
        rows: number,
        cols: number,
        density = this.#state.density,
        seed = this.#state.seed
    ): void {
        this.#buffer.resize(cols, rows);
        const grid = createGrid(rows, cols);
        seedGrid(grid, density, seed);
        this.#buffer.init(grid);

        this.#updateState({
            rows,
            cols,
            density,
            seed,
            generation: 0
        });
    }

    clear(): void {
        const grid = createGrid(this.#state.rows, this.#state.cols);
        this.#buffer.init(grid);
        this.#updateState({ generation: 0 });
    }

    randomize(density = this.#state.density): void {
        const grid = createGrid(this.#state.rows, this.#state.cols);
        seedGrid(grid, density, this.#state.seed);
        this.#buffer.init(grid);
        this.#updateState({ density, generation: 0 });
    }

    paintCell(col: number, row: number, value: number): void {
        this.#gpuPaint(col, row, value);
        this.#updateState({ generation: this.#state.generation + 1 });
    }

    placeCreature(col: number, row: number, creature: Creature): void {
        const offsetX = Math.floor(creature.width / 2);
        const offsetY = Math.floor(creature.height / 2);
        let changed = false;

        for (let y = 0; y < creature.height; y++) {
            const rowCells = creature.cells[y];
            for (let x = 0; x < creature.width; x++) {
                const val = rowCells[x];
                if (!val) continue;
                const gx = col - offsetX + x;
                const gy = row - offsetY + y;
                if (gx < 0 || gx >= this.#buffer.width || gy < 0 || gy >= this.#buffer.height)
                    continue;
                this.#gpuPaint(gx, gy, val);
                changed = true;
            }
        }

        if (changed) {
            this.#updateState({ generation: this.#state.generation + 1 });
        }
    }

    destroy(): void {
        this.pause();
        this.#buffer.destroy();
        this.#listeners.clear();
    }

    // ── Getters ──

    getDisplayTexture(): WebGLTexture {
        return this.#buffer.getTexture();
    }

    get width(): number {
        return this.#buffer.width;
    }

    get height(): number {
        return this.#buffer.height;
    }
}

// Singleton holder
let engineInstance: SimulationEngine | null = null;

export function setSimulationEngine(engine: SimulationEngine | null): void {
    engineInstance = engine;
}

export function getSimulationEngine(): SimulationEngine {
    if (!engineInstance) throw new Error('SimulationEngine not initialized');
    return engineInstance;
}

// Universal Selector Hook for React
export function useSimSelector<T>(selector: (state: SimState) => T): T {
    const engine = getSimulationEngine();
    return useSyncExternalStore(engine.subscribe, () => selector(engine.getSnapshot()));
}

// Specific Hooks using selector
export const useGeneration = () => useSimSelector((s) => s.generation);
export const useRunning = () => useSimSelector((s) => s.running);
export const useSpeedMs = () => useSimSelector((s) => s.speedMs);
export const useRuleId = () => useSimSelector((s) => s.ruleId);

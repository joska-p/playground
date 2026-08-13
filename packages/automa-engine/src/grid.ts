import { createSeededRandom } from './rng';

/** Cellular automaton grid represented as a flat Uint8Array buffer. */
type Grid = Uint8Array;

/** Allocates a new empty grid buffer of dimensions rows × cols. */
const createGrid = (rows: number, cols: number): Grid => new Uint8Array(rows * cols);

/** Seeds a grid buffer deterministically with live cells based on density and seed. */
const seedGrid = (grid: Grid, density: number, seed: number): void => {
    const rng = createSeededRandom(seed);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = rng() < density ? 1 : 0;
    }
};

export { createGrid, seedGrid };
export type { Grid };

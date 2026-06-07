import { createSeededRandom } from './rng.ts';
import type { Grid } from './types.ts';

const createGrid = (rows: number, cols: number): Grid =>
  new Uint8Array(rows * cols);

const seedGrid = (grid: Grid, density: number, seed: number): void => {
  const rng = createSeededRandom(seed);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = rng() < density ? 1 : 0;
  }
};

const createEmptyGrid = (size: number): Grid => new Uint8Array(size);

export { createEmptyGrid, createGrid, seedGrid };

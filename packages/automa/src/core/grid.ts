import { createRng } from './rng.ts';
import type { Grid } from './types.ts';

const createGrid = (rows: number, cols: number): Grid =>
  new Uint8Array(rows * cols);

const fillRandom = (grid: Grid, density: number, seed: number): void => {
  const rng = createRng(seed);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = rng() < density ? 1 : 0;
  }
};

const cloneEmpty = (grid: Grid): Grid => new Uint8Array(grid.length);

export { cloneEmpty, createGrid, fillRandom };

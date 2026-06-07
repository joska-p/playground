import type { Grid } from './types.ts';

const gridToTexture = (grid: Grid, data: Uint8Array): void => {
  for (let i = 0; i < grid.length; i++) {
    data[i] = grid[i] === 1 ? 255 : 0;
  }
};

export { gridToTexture };

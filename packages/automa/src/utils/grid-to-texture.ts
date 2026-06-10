import type { Grid } from '../core/types';

const copyGridToTextureData = (grid: Grid, data: Uint8Array): void => {
  for (let i = 0; i < grid.length; i++) {
    data[i] = grid[i];
  }
};

export { copyGridToTextureData };

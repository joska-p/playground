import type { Grid } from '@repo/automa-engine/types';

const copyGridToTextureData = (grid: Grid, data: Uint8Array): void => {
  for (let i = 0; i < grid.length; i++) {
    data[i] = grid[i] ?? 0;
  }
};

export { copyGridToTextureData };

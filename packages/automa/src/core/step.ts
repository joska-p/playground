import type { Grid } from './types.ts';
import { RULE_SURVIVE_MIN, RULE_SURVIVE_MAX, RULE_BIRTH } from '../config.ts';

const evolveGrid = (
  current: Grid,
  next: Grid,
  cols: number,
  rows: number
): void => {
  for (let index = 0; index < current.length; index++) {
    const row = (index / cols) | 0;
    const col = index % cols;

    const rowAbove = ((row - 1 + rows) % rows) * cols;
    const rowBelow = ((row + 1) % rows) * cols;
    const colLeft = (col - 1 + cols) % cols;
    const colRight = (col + 1) % cols;

    const neighbors =
      current[rowAbove + colLeft] +
      current[rowAbove + col] +
      current[rowAbove + colRight] +
      current[rowBelow + colLeft] +
      current[rowBelow + col] +
      current[rowBelow + colRight] +
      current[row * cols + colLeft] +
      current[row * cols + colRight];

    const alive = current[index] === 1;

    next[index] = alive
      ? neighbors >= RULE_SURVIVE_MIN && neighbors <= RULE_SURVIVE_MAX
        ? 1
        : 0
      : neighbors === RULE_BIRTH
        ? 1
        : 0;
  }
};

export { evolveGrid };

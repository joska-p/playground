import { evolve } from './engine';
import type { Rule } from './discrete/rules/types';
import type { Grid } from './types';

function evolveGrid(
  current: Grid,
  next: Grid,
  cols: number,
  rows: number,
  rule: Rule
): void {
  evolve(rule, current, next, cols, rows);
}

export { evolveGrid };

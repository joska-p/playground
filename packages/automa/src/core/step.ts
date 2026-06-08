import { evolve } from './engine.ts';
import type { Rule } from './rules/types.ts';
import type { Grid } from './types.ts';

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

import { evolve } from './engine';
import type { Grid } from '../grid';
import type { Rule } from '../rules/registry';

function evolveGrid(current: Grid, next: Grid, cols: number, rows: number, rule: Rule): void {
        evolve(rule, current, next, cols, rows);
}

export { evolveGrid };

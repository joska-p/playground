import { parseRule } from './parse.ts';
import type { Rule } from './types.ts';

const conwayRule: Rule = parseRule('conway', "Conway's Game of Life", 'B3/S23');

export { conwayRule };

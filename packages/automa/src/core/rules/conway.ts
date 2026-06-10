import { parseRule } from './parse';
import type { Rule } from './types';

const conwayRule: Rule = parseRule('conway', "Conway's Game of Life", 'B3/S23');

export { conwayRule };

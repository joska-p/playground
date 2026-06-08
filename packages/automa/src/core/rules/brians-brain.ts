import { parseRule } from './parse.ts';
import type { Rule } from './types.ts';

const briansBrainRule: Rule = parseRule(
  'brians-brain',
  "Brian's Brain",
  'B2/S',
  3
);

export { briansBrainRule };

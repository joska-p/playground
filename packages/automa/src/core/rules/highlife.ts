import { parseRule } from './parse.ts';
import type { Rule } from './types.ts';

const highlifeRule: Rule = parseRule('highlife', 'HighLife', 'B36/S23');

export { highlifeRule };

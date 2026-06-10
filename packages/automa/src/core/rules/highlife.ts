import { parseRule } from './parse';
import type { Rule } from './types';

const highlifeRule: Rule = parseRule('highlife', 'HighLife', 'B36/S23');

export { highlifeRule };

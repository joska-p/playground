import type { GrammarRule } from './types';

import { addRule } from './rules/add';
import { constantRule } from './rules/constant';
import { cosRule } from './rules/cos';
import { moduloRule } from './rules/modulo';
import { multiplyRule } from './rules/multiply';
import { sinRule } from './rules/sin';
import { terminalXRule } from './rules/terminal-x';
import { terminalYRule } from './rules/terminal-y';

const rules = new Map<string, GrammarRule>([
  [terminalXRule.id, terminalXRule],
  [terminalYRule.id, terminalYRule],
  [constantRule.id, constantRule],
  [sinRule.id, sinRule],
  [cosRule.id, cosRule],
  [multiplyRule.id, multiplyRule],
  [addRule.id, addRule],
  [moduloRule.id, moduloRule]
]);

export function getRule(id: string): GrammarRule | undefined {
  return rules.get(id);
}

export function getAllRules(): GrammarRule[] {
  return Array.from(rules.values());
}

import type { GrammarRule } from './types';

import { addRule } from './rules/add';
import { constantRule } from './rules/constant';
import { cosRule } from './rules/cos';
import { expRule } from './rules/exp';
import { greaterThanRule } from './rules/greater-than';
import { ifRule } from './rules/if';
import { lessThanRule } from './rules/less-than';
import { logRule } from './rules/log';
import { moduloRule } from './rules/modulo';
import { multiplyRule } from './rules/multiply';
import { powRule } from './rules/pow';
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
  [moduloRule.id, moduloRule],
  [expRule.id, expRule],
  [logRule.id, logRule],
  [powRule.id, powRule],
  [lessThanRule.id, lessThanRule],
  [greaterThanRule.id, greaterThanRule],
  [ifRule.id, ifRule]
]);

export function getRule(id: string): GrammarRule | undefined {
  return rules.get(id);
}

export function getAllRules(): GrammarRule[] {
  return Array.from(rules.values());
}

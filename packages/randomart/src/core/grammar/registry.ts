import type { GrammarRule } from './types';

import { absRule } from './rules/abs';
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
import { pixelRandomRule } from './rules/pixel-random';
import { powRule } from './rules/pow';
import { sinRule } from './rules/sin';
import { sqrtRule } from './rules/sqrt';
import { terminalTRule } from './rules/terminal-t';
import { terminalXRule } from './rules/terminal-x';
import { terminalYRule } from './rules/terminal-y';

const rules = new Map<string, GrammarRule>([
  [terminalTRule.id, terminalTRule],
  [terminalXRule.id, terminalXRule],
  [terminalYRule.id, terminalYRule],
  [constantRule.id, constantRule],
  [pixelRandomRule.id, pixelRandomRule],
  [sinRule.id, sinRule],
  [cosRule.id, cosRule],
  [sqrtRule.id, sqrtRule],
  [absRule.id, absRule],
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

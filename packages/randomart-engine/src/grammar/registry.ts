import type { GrammarRule } from '../types';

import { absRule } from './rules/abs';
import { addRule } from './rules/add';
import { bandedNoiseRule } from './rules/bandedNoise';
import { constantRule } from './rules/constant';
import { cosRule } from './rules/cos';
import { expRule } from './rules/exp';
import { greaterThanRule } from './rules/greater-than';
import { ifRule } from './rules/if';
import { lessThanRule } from './rules/less-than';
import { logRule } from './rules/log';
import { moduloRule } from './rules/modulo';
import { multiplyRule } from './rules/multiply';
import { nestedOscillationRule } from './rules/nested-oscillation';
import { pixelRandomRule } from './rules/pixel-random';
import { powRule } from './rules/pow';
import { radialSymmetryRule } from './rules/radial-symmetry';
import { recamanPatternRule } from './rules/recamanPattern';
import { sinRule } from './rules/sin';
import { sqrtRule } from './rules/sqrt';
import { terminalXRule } from './rules/terminal-x';
import { terminalYRule } from './rules/terminal-y';

const rules = new Map<string, GrammarRule>([
  [terminalXRule.id, terminalXRule],
  [terminalYRule.id, terminalYRule],
  [constantRule.id, constantRule],
  [pixelRandomRule.id, pixelRandomRule],
  [sinRule.id, sinRule],
  [cosRule.id, cosRule],
  [sqrtRule.id, sqrtRule],
  [absRule.id, absRule],
  [multiplyRule.id, multiplyRule],
  [nestedOscillationRule.id, nestedOscillationRule],
  [addRule.id, addRule],
  [moduloRule.id, moduloRule],
  [expRule.id, expRule],
  [logRule.id, logRule],
  [powRule.id, powRule],
  [radialSymmetryRule.id, radialSymmetryRule],
  [lessThanRule.id, lessThanRule],
  [greaterThanRule.id, greaterThanRule],
  [ifRule.id, ifRule],
  [radialSymmetryRule.id, radialSymmetryRule],
  [nestedOscillationRule.id, nestedOscillationRule],
  [recamanPatternRule.id, recamanPatternRule],
  [bandedNoiseRule.id, bandedNoiseRule]
]);

export function getRule(id: string): GrammarRule | undefined {
  return rules.get(id);
}

export function getAllRules(): GrammarRule[] {
  return Array.from(rules.values());
}

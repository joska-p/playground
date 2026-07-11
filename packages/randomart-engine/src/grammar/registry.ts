import type { GrammarRule } from '../types';

import { absRule } from './rules/abs';
import { addRule } from './rules/add';
import { atanRule } from './rules/atan';
import { bandedNoiseRule } from './rules/bandedNoise';
import { clampRule } from './rules/clamp';
import { constantRule } from './rules/constant';
import { cosRule } from './rules/cos';
import { expRule } from './rules/exp';
import { fbmRule } from './rules/fbm';
import { fractRule } from './rules/fract';
import { greaterThanRule } from './rules/greater-than';
import { ifRule } from './rules/if';
import { lengthRule } from './rules/length';
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
import { smoothstepRule } from './rules/smoothstep';
import { sqrtRule } from './rules/sqrt';
import { stepRule } from './rules/step';
import { terminalXRule } from './rules/terminal-x';
import { terminalYRule } from './rules/terminal-y';
import { voronoiRule } from './rules/voronoi';

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
  [recamanPatternRule.id, recamanPatternRule],
  [bandedNoiseRule.id, bandedNoiseRule],
  [voronoiRule.id, voronoiRule],
  [fbmRule.id, fbmRule],
  [stepRule.id, stepRule],
  [smoothstepRule.id, smoothstepRule],
  [lengthRule.id, lengthRule],
  [atanRule.id, atanRule],
  [fractRule.id, fractRule],
  [clampRule.id, clampRule]
]);

export function getRule(id: string): GrammarRule | undefined {
  return rules.get(id);
}

export function getAllRules(): GrammarRule[] {
  return Array.from(rules.values());
}

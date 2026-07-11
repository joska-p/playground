import type { GrammarRule } from '../types';

import {
  absRule,
  addRule,
  bandedNoiseRule,
  clampRule,
  constantRule,
  cosRule,
  expRule,
  fbmRule,
  fractRule,
  greaterThanRule,
  ifRule,
  lessThanRule,
  logRule,
  moduloRule,
  multiplyRule,
  nestedOscillationRule,
  pixelRandomRule,
  powRule,
  radialRule,
  recamanPatternRule,
  sinRule,
  smoothstepRule,
  sqrtRule,
  stepRule,
  sweepRule,
  terminalXRule,
  terminalYRule,
  voronoiRule
} from './rules';

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

  [lessThanRule.id, lessThanRule],
  [greaterThanRule.id, greaterThanRule],
  [ifRule.id, ifRule],
  [recamanPatternRule.id, recamanPatternRule],
  [bandedNoiseRule.id, bandedNoiseRule],
  [voronoiRule.id, voronoiRule],
  [fbmRule.id, fbmRule],
  [stepRule.id, stepRule],
  [smoothstepRule.id, smoothstepRule],
  [radialRule.id, radialRule],
  [sweepRule.id, sweepRule],
  [fractRule.id, fractRule],
  [clampRule.id, clampRule]
]);

export function getRule(id: string): GrammarRule | undefined {
  return rules.get(id);
}

export function getAllRules(): GrammarRule[] {
  return Array.from(rules.values());
}

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

export const allRules = [
  terminalXRule,
  terminalYRule,
  constantRule,
  pixelRandomRule,
  sinRule,
  cosRule,
  sqrtRule,
  absRule,
  multiplyRule,
  nestedOscillationRule,
  addRule,
  moduloRule,
  expRule,
  logRule,
  powRule,
  lessThanRule,
  greaterThanRule,
  ifRule,
  recamanPatternRule,
  bandedNoiseRule,
  voronoiRule,
  fbmRule,
  stepRule,
  smoothstepRule,
  radialRule,
  sweepRule,
  fractRule,
  clampRule
] as const;

export type RuleId = (typeof allRules)[number]['id'];

const rules = new Map<RuleId, GrammarRule>(allRules.map((r) => [r.id, r]));

export function getRule(id: RuleId) {
  return rules.get(id);
}

export function getAllRules() {
  return Array.from(rules.values());
}

export function getAllRuleIds() {
  return allRules.map((rule) => rule.id);
}

export function getInitialWeights() {
  return allRules.reduce(
    (acc, rule) => {
      acc[rule.id] = rule.weight;
      return acc;
    },
    {} as Record<RuleId, number>
  );
}

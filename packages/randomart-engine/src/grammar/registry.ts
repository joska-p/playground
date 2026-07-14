import type { GrammarRule } from '../types';
import {
  absRule,
  addRule,
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
  pixelRandomRule,
  powRule,
  radialRule,
  sinRule,
  smoothstepRule,
  sqrtRule,
  sweepRule,
  terminalXRule,
  terminalYRule
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
  addRule,
  moduloRule,
  expRule,
  logRule,
  powRule,
  lessThanRule,
  greaterThanRule,
  ifRule,
  fbmRule,
  smoothstepRule,
  radialRule,
  sweepRule,
  fractRule,
  clampRule
] as const;

export type RuleId = (typeof allRules)[number]['id'];

const rules = new Map<RuleId, GrammarRule>(allRules.map((rule) => [rule.id, rule]));

export function getRule(id: RuleId) {
  return rules.get(id);
}

export function getAllRules(): GrammarRule[] {
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

/* removed the stepRule as it produce the same thing as > */
/* recamanPatternRule */
/* nestedOscillationRule */

import { briansBrainRule } from './brians-brain.ts';
import { conwayRule } from './conway.ts';
import { highlifeRule } from './highlife.ts';
import type { Rule } from './types.ts';

const rules = new Map<string, Rule>([
  [conwayRule.id, conwayRule],
  [highlifeRule.id, highlifeRule],
  [briansBrainRule.id, briansBrainRule],
]);

function registerRule(rule: Rule): void {
  rules.set(rule.id, rule);
}

function getRule(id: string): Rule | undefined {
  return rules.get(id);
}

function getAllRules(): Rule[] {
  return Array.from(rules.values());
}

export { getAllRules, getRule, registerRule };

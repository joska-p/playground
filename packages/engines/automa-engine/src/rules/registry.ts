import { briansBrainRule } from './brians-brain';
import { conwayRule } from './conway';
import { highlifeRule } from './highlife';
import type { Rule } from './types';

const rules = new Map<string, Rule>([
  [conwayRule.id, conwayRule],
  [highlifeRule.id, highlifeRule],
  [briansBrainRule.id, briansBrainRule]
]);

function getRule(id: string): Rule | undefined {
  return rules.get(id);
}

function getAllRules(): Rule[] {
  return Array.from(rules.values());
}

export { getAllRules, getRule };

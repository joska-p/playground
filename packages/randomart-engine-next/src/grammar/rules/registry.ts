import type { OperatorId } from '../operators/registry.js';
import { classicRule, fatRule, flowRule, paperRule } from './rule-definitions.js';

export type RuleCategory = 'classic';

export type Rule = {
  readonly id: string;
  readonly displayName: string;
  readonly category: RuleCategory;
  readonly operators: OperatorId[];
  readonly maxDepth: number;
  readonly minDepth: number;
};

export const RULES = {
  classic: classicRule,
  paper: paperRule,
  flow: flowRule,
  fat: fatRule
} satisfies Record<string, Rule>;

export type RuleId = keyof typeof RULES;
export const ruleIds: RuleId[] = Object.keys(RULES) as RuleId[];

export const DEFAULT_RULE_ID = 'classic' as RuleId;

export function listRules(): Rule[] {
  return Object.values(RULES);
}

export function getRule(id: RuleId): Rule {
  return RULES[id];
}

export function hasRule(id: RuleId): boolean {
  return id in RULES;
}

const RULE_CATEGORY_ORDER: RuleCategory[] = ['classic'];

const RULE_CATEGORY_LABELS: Record<RuleCategory, string> = {
  classic: 'Classic'
};

export type RuleGroup = {
  label: string;
  rules: { id: RuleId; displayName: string }[];
};

export function listRuleGroups(): RuleGroup[] {
  const grouped = new Map<RuleCategory, { id: RuleId; displayName: string }[]>();

  for (const cat of RULE_CATEGORY_ORDER) {
    grouped.set(cat, []);
  }

  for (const rule of Object.values(RULES)) {
    grouped.get(rule.category)!.push({ id: rule.id as RuleId, displayName: rule.displayName });
  }

  return RULE_CATEGORY_ORDER.map((cat) => ({
    label: RULE_CATEGORY_LABELS[cat],
    rules: grouped.get(cat)!
  }));
}

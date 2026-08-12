import type { OperatorId } from '../operators/registry.js';
import { classicRule, fatRule, flowRule, paperRule } from './rule-definitions.js';

/** The category a rule belongs to (only `classic` today). */
export type RuleKind = 'classic';

/** A rule: the operator pool and depth bounds a generated tree is grown within. */
export type Rule = {
    readonly id: string;
    readonly label: string;
    readonly kind: RuleKind;
    readonly operatorIds: OperatorId[];
    readonly maxDepth: number;
    readonly minDepth: number;
};

/** The built-in rule registry, keyed by rule id. */
export const RULES = {
    classic: classicRule,
    paper: paperRule,
    flow: flowRule,
    fat: fatRule
} satisfies Record<string, Rule>;

/** Union of the ids of every built-in rule. */
export type RuleId = keyof typeof RULES;
export const ruleIds: RuleId[] = Object.keys(RULES) as RuleId[];

/** The rule used when none is specified. */
export const DEFAULT_RULE_ID: RuleId = 'classic';

/** Every built-in rule, in registration order. */
export function listRules(): Rule[] {
    return Object.values(RULES);
}

/** Look up a rule definition by id. */
export function getRule(id: RuleId): Rule {
    return RULES[id];
}

/** Whether a rule with the given id exists. */
export function hasRule(id: RuleId): boolean {
    return id in RULES;
}

const RULE_KIND_ORDER: RuleKind[] = ['classic'];

const RULE_KIND_LABELS: Record<RuleKind, string> = {
    classic: 'Classic'
};

/** One category of rules with its members, for pickers. */
export type RuleGroup = {
    label: string;
    rules: { id: RuleId; label: string }[];
};

/** All rules grouped by {@link RuleKind}, for building pickers. */
export function listRuleGroups(): RuleGroup[] {
    const grouped = new Map<RuleKind, { id: RuleId; label: string }[]>();

    for (const cat of RULE_KIND_ORDER) {
        grouped.set(cat, []);
    }

    for (const rule of Object.values(RULES)) {
        grouped.get(rule.kind)!.push({ id: rule.id, label: rule.label });
    }

    return RULE_KIND_ORDER.map((cat) => ({
        label: RULE_KIND_LABELS[cat],
        rules: grouped.get(cat)!
    }));
}

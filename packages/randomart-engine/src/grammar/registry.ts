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

/**
 * Every built-in grammar rule, in registration order.
 */
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

/**
 * Union of the ids of every rule in {@link allRules}.
 */
export type RuleId = (typeof allRules)[number]['id'];

const rules = new Map<RuleId, GrammarRule>(allRules.map((rule) => [rule.id, rule]));

/**
 * Looks up a rule by id, or `undefined` when the id is unknown.
 */
export function getRule(id: RuleId) {
    return rules.get(id);
}

/**
 * Returns all registered rules — the full grammar.
 */
export function getAllRules(): GrammarRule[] {
    return Array.from(rules.values());
}

/**
 * Returns the id of every registered rule.
 */
export function getAllRuleIds() {
    return allRules.map((rule) => rule.id);
}

/**
 * Returns the default weight of every rule — the baseline that `ruleWeights`
 * overrides on top of.
 */
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

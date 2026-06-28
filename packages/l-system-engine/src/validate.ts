import { STOCHASTIC_PRODUCTIONS_KEY, type StochasticRule } from './rules/stochastic-rule';
import type { Grammar, ValidationError } from './types';

const WEIGHT_SUM_TOLERANCE = 0.001;

function isStochasticRule(rule: object): rule is StochasticRule {
  return STOCHASTIC_PRODUCTIONS_KEY in rule;
}

/**
 * Validates a grammar definition and returns a list of errors.
 * An empty array means the grammar is valid.
 *
 * Checks performed:
 * - Stochastic rule weights sum to 1.0 (±0.001 tolerance).
 */
export function validate(grammar: Grammar): ValidationError[] {
  const errors: ValidationError[] = [];

  for (let i = 0; i < grammar.rules.length; i++) {
    const rule = grammar.rules[i]!;

    if (isStochasticRule(rule)) {
      const productions = rule[STOCHASTIC_PRODUCTIONS_KEY];
      const sum = productions.reduce((acc, p) => acc + p.weight, 0);
      if (Math.abs(sum - 1) > WEIGHT_SUM_TOLERANCE) {
        errors.push({
          code: 'STOCHASTIC_WEIGHT_SUM',
          message: `Rule at index ${i.toString()}: stochastic weights sum to ${sum.toFixed(4)} but must sum to 1.0 (±${WEIGHT_SUM_TOLERANCE.toString()}).`
        });
      }
    }
  }

  return errors;
}

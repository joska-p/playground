import type { SequenceRule } from './types';
import { recamanRule } from './recaman';
import { fibonacciRule } from './fibonacci';
import { primesRule } from './primes';
import { triangularRule } from './triangular';
import { collatzRule } from './collatz';

const rules = new Map<string, SequenceRule>([
  [recamanRule.id, recamanRule],
  [fibonacciRule.id, fibonacciRule],
  [primesRule.id, primesRule],
  [triangularRule.id, triangularRule],
  [collatzRule.id, collatzRule]
]);

export function getRule(id: string): SequenceRule | undefined {
  return rules.get(id);
}

export function getAllRules(): SequenceRule[] {
  return Array.from(rules.values());
}

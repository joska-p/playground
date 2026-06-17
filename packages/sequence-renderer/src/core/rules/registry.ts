import { fibonacciRule } from './fibonacci';
import { primesRule } from './primes';
import { recamanRule } from './recaman';
import { triangularRule } from './triangular';
import type { SequenceRule } from './types';

const rules = new Map<string, SequenceRule>([
  [recamanRule.id, recamanRule],
  [fibonacciRule.id, fibonacciRule],
  [primesRule.id, primesRule],
  [triangularRule.id, triangularRule]
]);

export function getAllRules(): SequenceRule[] {
  return Array.from(rules.values());
}

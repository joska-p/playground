import { collatzRule } from './collatz';
import { fibonacciRule } from './fibonacci';
import { lookAndSayRule } from './lookAndSay';
import { padovanRule } from './padovan';
import { primesRule } from './primes';
import { recamanRule } from './recaman';
import { squareNumbersRule } from './squareNumbers';
import { sternDiatomicRule } from './sternDiatomic';
import { triangularRule } from './triangular';
import type { SequenceRule } from './types';

const rules = new Map<string, SequenceRule>([
  [recamanRule.id, recamanRule],
  [fibonacciRule.id, fibonacciRule],
  [primesRule.id, primesRule],
  [triangularRule.id, triangularRule],
  [collatzRule.id, collatzRule],
  [lookAndSayRule.id, lookAndSayRule],
  [padovanRule.id, padovanRule],
  [squareNumbersRule.id, squareNumbersRule],
  [sternDiatomicRule.id, sternDiatomicRule]
]);

export function getAllRules(): SequenceRule[] {
  return Array.from(rules.values());
}

export function registerRule(rule: SequenceRule): void {
  rules.set(rule.id, rule);
}

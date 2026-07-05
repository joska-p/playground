import type { SequenceRule } from './types';

import { collatzRule } from './collatz';
import { fibonacciRule } from './fibonacci';
import { lookAndSayRule } from './lookAndSay';
import { padovanRule } from './padovan';
import { primesRule } from './primes';
import { recamanRule } from './recaman';
import { squareNumbersRule } from './squareNumbers';
import { sternDiatomicRule } from './sternDiatomic';
import { triangularRule } from './triangular';

// Define the initial rules as a const array for type inference
const initialRules = [
  recamanRule,
  fibonacciRule,
  primesRule,
  triangularRule,
  collatzRule,
  lookAndSayRule,
  padovanRule,
  squareNumbersRule,
  sternDiatomicRule
] as const;

// Extract union types for RuleId and RuleName
export type RuleId = (typeof initialRules)[number]['id']; // e.g., "recaman" | "fibonacci" | ...
export type RuleName = (typeof initialRules)[number]['name']; // e.g., "Recaman's Rule" | "Fibonacci" | ...

// Create a mutable array for runtime use
const allRules: SequenceRule[] = [...initialRules];

// Function to register a new rule
export function registerRule(rule: SequenceRule) {
  allRules.push(rule);
}

// Export the mutable array and types
export { allRules };

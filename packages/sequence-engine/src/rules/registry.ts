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

/** Union of all initial rule ID string literals. */
export type RuleId = (typeof initialRules)[number]['id']; // e.g., "recaman" | "fibonacci" | ...

/** Union of all initial rule display names. */
export type RuleName = (typeof initialRules)[number]['name']; // e.g., "Recaman's Rule" | "Fibonacci" | ...

// Create a mutable array for runtime use
/** Global registry of available sequence rules. */
const allRules: SequenceRule[] = [...initialRules];

/**
 * Registers a new sequence rule into the global rule registry.
 *
 * @param rule - The sequence rule to add.
 */
export function registerRule(rule: SequenceRule) {
    allRules.push(rule);
}

// Export the mutable array and types
export { allRules };

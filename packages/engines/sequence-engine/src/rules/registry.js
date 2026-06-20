import { collatzRule } from './collatz';
import { fibonacciRule } from './fibonacci';
import { lookAndSayRule } from './lookAndSay';
import { padovanRule } from './padovan';
import { primesRule } from './primes';
import { recamanRule } from './recaman';
import { squareNumbersRule } from './squareNumbers';
import { sternDiatomicRule } from './sternDiatomic';
import { triangularRule } from './triangular';
const rules = new Map([
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
export function getAllRules() {
    return Array.from(rules.values());
}

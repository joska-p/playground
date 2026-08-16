import { steps } from './steps';
import type { ExpandOptions, Grammar, Word } from './types';

/** `iterations = 0` returns the axiom unchanged. */
export function expand(grammar: Grammar, iterations: number, options?: ExpandOptions): Word {
    const iter = steps(grammar, options);
    let word: Word = grammar.axiom;

    for (let i = 0; i <= iterations; i++) {
        const result = iter.next();
        word = result.value;
    }

    return word;
}

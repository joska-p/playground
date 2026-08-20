import { createRandom } from './random';
import type { Context, ExpandOptions, Grammar, Word } from './types';

function rewrite(word: Word, grammar: Grammar, random: () => number): Word {
    const next: Word[number][] = [];
    const keep = grammar.unmatchedSymbol !== 'remove';

    for (let i = 0; i < word.length; i++) {
        const sym = word[i];

        const context: Context = { word, index: i, random };

        let matched = false;
        for (const rule of grammar.rules) {
            if (rule.match(sym, context)) {
                const replacement = rule.apply(sym, context);
                next.push(...replacement);
                matched = true;
                break;
            }
        }

        if (!matched && keep) {
            next.push(sym);
        }
    }

    return next;
}

/** Yields one word per iteration, starting with the axiom (iteration 0). */
export function steps(grammar: Grammar, options?: ExpandOptions): Iterator<Word, Word> {
    const seed = options?.seed ?? (Math.random() * 2 ** 32) | 0;
    const random = createRandom(seed);
    let current: Word = grammar.axiom;
    let started = false;

    return {
        next(): IteratorResult<Word> {
            if (!started) {
                started = true;
                return { value: current, done: false };
            }
            current = rewrite(current, grammar, random);
            return { value: current, done: false };
        }
    };
}

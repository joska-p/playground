import { createRandom } from './random';
import type { Context, ExpandOptions, Grammar, Word } from './types';

/**
 * Applies one rewriting step to `word` using `grammar.rules`.
 * For each symbol, the first matching rule is applied (declaration-order priority).
 * Unmatched symbols are kept or removed according to `grammar.unmatchedSymbol`.
 */
function rewrite(word: Word, grammar: Grammar, random: () => number): Word {
  const next: Word[number][] = [];
  const keep = grammar.unmatchedSymbol !== 'remove';

  for (let i = 0; i < word.length; i++) {
    const sym = word[i];
    if (!sym) continue;
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

/**
 * Returns an iterator that yields one word per iteration, starting from the axiom.
 * The first value yielded is `grammar.axiom` (iteration 0).
 *
 * Useful for animation: the UI calls `iterator.next()` on each frame.
 *
 * @example
 * const iter = steps(grammar, { seed: 42 });
 * const iteration0 = iter.next().value; // axiom
 * const iteration1 = iter.next().value; // after one rewrite
 */
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

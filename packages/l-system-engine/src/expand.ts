import { steps } from './steps';
import type { ExpandOptions, Grammar, Word } from './types';

/**
 * Runs the rewriting process for a given number of iterations and returns the
 * final word. A thin wrapper over `steps()`.
 *
 * - Pure function — does not mutate the grammar.
 * - `seed` controls the RNG for stochastic grammars. Same seed → same result.
 * - `iterations = 0` returns the axiom unchanged.
 *
 * @example
 * const word = expand(grammar, 5, { seed: 42 });
 */
export function expand(grammar: Grammar, iterations: number, options?: ExpandOptions): Word {
  const iter = steps(grammar, options);
  let word: Word = grammar.axiom;

  for (let i = 0; i <= iterations; i++) {
    const result = iter.next();
    word = result.value;
  }

  return word;
}

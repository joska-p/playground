import type { Context, LSymbol, Rule, Word } from '../types';

export type StochasticProduction = {
  /** Relative probability of this production being chosen. Must sum to 1.0. */
  readonly weight: number;
  readonly produce: Word;
};

/** @internal Brand attached to stochastic rules for validate() introspection. */
export const STOCHASTIC_PRODUCTIONS_KEY = '__stochasticProductions';

/** @internal Branded type that validate() uses to introspect stochastic rules. */
export type StochasticRule = {
  readonly [STOCHASTIC_PRODUCTIONS_KEY]: readonly StochasticProduction[];
} & Rule;

/**
 * Matches any symbol whose name equals `name`.
 * On each application, picks one of the given productions randomly,
 * weighted by `weight`, using `context.random`.
 *
 * Weights must sum to 1.0 (±0.001 tolerance).
 * Validation is deferred to `validate()` — this factory does not throw.
 *
 * @example
 * stochasticRule('F', [
 *   { weight: 0.7, produce: [symbol('F'), symbol('F')] },
 *   { weight: 0.3, produce: [symbol('F')] },
 * ])
 */
export function stochasticRule(
  name: string,
  productions: readonly StochasticProduction[]
): StochasticRule {
  return {
    [STOCHASTIC_PRODUCTIONS_KEY]: productions,

    match(sym: LSymbol): boolean {
      return sym.name === name;
    },
    apply(_sym: LSymbol, context: Context): Word {
      const r = context.random();
      let cumulative = 0;
      for (const production of productions) {
        cumulative += production.weight;
        if (r < cumulative) {
          return production.produce;
        }
      }
      // Floating-point rounding guard: return the last production.
      return productions[productions.length - 1]?.produce ?? [];
    }
  };
}

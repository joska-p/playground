import type { Context, LSymbol, Rule, Word } from '../types';

/** Weights across one rule's productions must sum to 1.0. */
export type StochasticProduction = {
    readonly weight: number;
    readonly produce: Word;
};

/** @internal */
export const STOCHASTIC_PRODUCTIONS_KEY = '__stochasticProductions';

/** @internal */
export type StochasticRule = {
    readonly [STOCHASTIC_PRODUCTIONS_KEY]: readonly StochasticProduction[];
} & Rule;

/** Weight validation is deferred to `validate()` — this factory never throws. */
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

import type { Context, LSymbol, Parameter, Rule, Word } from '../types';

export interface ParametricOptions {
  /** Name of the symbol this rule matches. */
  readonly name: string;
  /**
   * Optional guard predicate evaluated against the symbol's parameters.
   * The rule only fires when the guard returns true (or when omitted).
   */
  readonly guard?: (params: readonly Parameter[]) => boolean;
  /**
   * Produces a replacement word from the matched symbol's parameters.
   */
  readonly produce: (params: readonly Parameter[]) => Word;
}

/**
 * Matches a symbol by name and an optional guard predicate on its parameters.
 * The production is a function that receives the current parameters and
 * returns a new word — enabling parameter transformations at each step.
 *
 * @example
 * parametricRule({
 *   name: 'F',
 *   guard: ([length]) => length > 0.01,
 *   produce: ([length]) => [symbol('F', length * 0.5), symbol('+'), symbol('F', length * 0.5)],
 * })
 */
export function parametricRule(options: ParametricOptions): Rule {
  return {
    match(sym: LSymbol, _context: Context): boolean {
      if (sym.name !== options.name) return false;
      if (options.guard !== undefined && !options.guard(sym.params)) return false;
      return true;
    },
    apply(sym: LSymbol, _context: Context): Word {
      return options.produce(sym.params);
    },
  };
}

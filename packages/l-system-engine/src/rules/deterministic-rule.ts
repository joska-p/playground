import type { LSymbol, Rule, Word } from '../types';

/**
 * Matches any symbol whose name equals `name` and always produces the same word.
 *
 * @example
 * deterministicRule('F', [symbol('F'), symbol('+'), symbol('F')])
 */
export function deterministicRule(name: string, production: Word): Rule {
  return {
    match(sym: LSymbol): boolean {
      return sym.name === name;
    },
    apply(): Word {
      return production;
    }
  };
}

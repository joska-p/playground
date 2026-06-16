import type { GrammarRule } from './types';

export function defineGrammarRule(config: GrammarRule): GrammarRule {
  return Object.freeze({ ...config });
}

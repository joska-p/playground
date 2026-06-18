import type { GrammarRule } from '../types';

export const expRule = {
  id: 'exp',
  name: 'Exp',
  arity: 1,
  evaluate: (args) => Math.exp(args[0]()),
  toMathString: (args) => `e^(${args[0]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── exp\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'exp',
    args: [buildChild()]
  })
} satisfies GrammarRule;

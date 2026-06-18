import type { GrammarRule } from '../types';

export const logRule = {
  id: 'log',
  name: 'Log',
  arity: 1,
  evaluate: (args) => Math.log(Math.abs(args[0]()) + 1e-10),
  toMathString: (args) => `log(|${args[0]}|)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── log\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'log',
    args: [buildChild()]
  })
} satisfies GrammarRule;

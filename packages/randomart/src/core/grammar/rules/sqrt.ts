import type { GrammarRule } from '../types';

export const sqrtRule = {
  id: 'sqrt',
  name: 'Sqrt',
  arity: 1,
  evaluate: (args) => Math.sqrt(Math.abs(args[0]()) + 1e-10),
  toMathString: (args) => `sqrt(|${args[0]}|)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── sqrt\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'sqrt',
    args: [buildChild()]
  })
} satisfies GrammarRule;

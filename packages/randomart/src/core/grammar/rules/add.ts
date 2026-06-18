import type { GrammarRule } from '../types';

export const addRule = {
  id: 'add',
  name: 'Add',
  arity: 2,
  weight: 2,
  evaluate: (args) => (args[0]() + args[1]()) / 2,
  toMathString: (args) => `((${args[0]} + ${args[1]}) / 2)`,
  toGLSL: (args) => `((${args[0]} + ${args[1]}) / 2.0)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── add\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'add',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

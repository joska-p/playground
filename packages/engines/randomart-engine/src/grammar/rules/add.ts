import type { GrammarRule } from '../../types';

export const addRule = {
  id: 'add',
  name: 'Add',
  arity: 2,
  weight: 1.0,
  category: 'structural',
  evaluate: (args) => (args[0]() + args[1]()) * 0.5, // Multiplication is slightly faster than division
  toMathString: (args) => `((${args[0]} + ${args[1]}) / 2)`,
  toGLSL: (args) => `((${args[0]} + ${args[1]}) * 0.5)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── add\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'add',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

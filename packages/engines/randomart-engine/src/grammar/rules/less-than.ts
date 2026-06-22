import type { GrammarRule } from '../../types';

export const lessThanRule = {
  id: 'less-than',
  name: 'Less Than',
  arity: 2,
  weight: 0.4, // Keep low: Step functions create harsh line artifacts
  category: 'structural',
  evaluate: (args) => (args[0]() < args[1]() ? 1.0 : -1.0),
  toMathString: (args) => `(${args[0]} < ${args[1]} ? 1 : -1)`,
  toGLSL: (args) => `(${args[0]} < ${args[1]} ? 1.0 : -1.0)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── less-than\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'less-than',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

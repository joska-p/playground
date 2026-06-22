import type { GrammarRule } from '../../types';

export const greaterThanRule = {
  id: 'greater-than',
  name: 'Greater Than',
  arity: 2,
  weight: 0.4, // Keep low: Step functions create harsh, non-organic line artifacts
  category: 'structural',
  evaluate: (args) => (args[0]() > args[1]() ? 1.0 : -1.0),
  toMathString: (args) => `(${args[0]} > ${args[1]} ? 1 : -1)`,
  toGLSL: (args) => `(${args[0]} > ${args[1]} ? 1.0 : -1.0)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── greater-than\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'greater-than',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

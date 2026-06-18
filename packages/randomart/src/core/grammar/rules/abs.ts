import type { GrammarRule } from '../types';

export const absRule = {
  id: 'abs',
  name: 'Abs',
  arity: 1,
  weight: 1,
  evaluate: (args) => Math.abs(args[0]()),
  toMathString: (args) => `|${args[0]}|`,
  toGLSL: (args) => `abs(${args[0]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── abs\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'abs',
    args: [buildChild()]
  })
} satisfies GrammarRule;

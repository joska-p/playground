import type { GrammarRule } from '../types';

export const multiplyRule = {
  id: 'multiply',
  name: 'Multiply',
  arity: 2,
  weight: 2,
  evaluate: (args) => args[0]() * args[1](),
  toMathString: (args) => `(${args[0]} · ${args[1]})`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── multiply\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'multiply',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

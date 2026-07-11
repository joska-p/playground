import type { GrammarRule } from '../../types';

export const stepRule = {
  id: 'step',
  name: 'Step',
  arity: 2,
  weight: 0.4,
  category: 'structural',
  evaluate: (args) => (args[0]() >= args[1]() ? 1.0 : -1.0),
  toMathString: (args) => `step(${args[0]}, ${args[1]})`,
  toGLSL: (args) => `(2.0 * step(${args[0]}, ${args[1]}) - 1.0)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── step\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'step',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

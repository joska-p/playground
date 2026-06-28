import type { GrammarRule } from '../../types';

export const sinRule = {
  id: 'sin',
  name: 'Sine',
  arity: 1,
  weight: 1.2, // Slightly bumped: Sin/Cos oscillations create excellent texture patterns
  category: 'structural',
  evaluate: (args) => Math.sin(Math.PI * args[0]()),
  toMathString: (args) => `sin(π · ${args[0]})`,
  toGLSL: (args) => `sin(3.1415926535 * ${args[0]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── sin\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'sin',
    args: [buildChild()]
  })
} satisfies GrammarRule;

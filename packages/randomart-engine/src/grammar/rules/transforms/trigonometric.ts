import type { GrammarRule } from '../../../types';

export const sinRule = {
  id: 'sin',
  name: 'Wave',
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
} as const satisfies GrammarRule;

export const cosRule = {
  id: 'cos',
  name: 'Ripple',
  arity: 1,
  weight: 1.0,
  category: 'structural',
  evaluate: (args) => Math.cos(Math.PI * args[0]()),
  toMathString: (args) => `cos(π · ${args[0]})`,
  toGLSL: (args) => `cos(3.1415926535 * ${args[0]})`, // Higher precision PI
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── cos\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'cos',
    args: [buildChild()]
  })
} as const satisfies GrammarRule;

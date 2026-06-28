import type { GrammarRule } from '../../types';

export const moduloRule = {
  id: 'modulo',
  name: 'Modulo',
  arity: 2,
  weight: 0.4, // Keep lower to restrict repetitive harsh stripes
  category: 'structural',
  evaluate: (args) => {
    const base = args[0]();
    const mod = args[1]();
    return mod === 0.0 ? 0.0 : base % mod;
  },
  toMathString: (args) => `(${args[0]} % ${args[1]})`,
  toGLSL: (args) => `(${args[1]} == 0.0 ? 0.0 : mod(${args[0]}, ${args[1]}))`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── modulo\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'modulo',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

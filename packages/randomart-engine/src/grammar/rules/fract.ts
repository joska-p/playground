import type { GrammarRule } from '../../types';

export const fractRule = {
  id: 'fract',
  name: 'Fract',
  arity: 1,
  weight: 0.6,
  category: 'structural',
  evaluate: (args) => {
    const v = args[0]();
    return (v - Math.floor(v)) * 2.0 - 1.0;
  },
  toMathString: (args) => `fract(${args[0]})`,
  toGLSL: (args) => `(fract(${args[0]}) * 2.0 - 1.0)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── fract\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'fract',
    args: [buildChild()]
  })
} satisfies GrammarRule;

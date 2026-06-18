import type { GrammarRule } from '../types';

export const powRule = {
  id: 'pow',
  name: 'Power',
  arity: 2,
  weight: 1,
  evaluate: (args) => {
    const base = args[0]();
    const exp = args[1]();
    return Math.sign(base) * Math.pow(Math.abs(base), exp);
  },
  toMathString: (args) => `(${args[0]}^${args[1]})`,
  toGLSL: (args) => `pow(abs(${args[0]}), ${args[1]})`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── pow\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'pow',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

import type { GrammarRule } from '../../types';

export const powRule = {
  id: 'pow',
  name: 'Power',
  arity: 2,
  weight: 0.7, // Keep slightly tamed to prevent flat color clamping values
  category: 'structural',
  evaluate: (args) => {
    const base = args[0]();
    const exp = Math.max(-3.0, Math.min(3.0, args[1]())); // Safe clamping bounds for JavaScript
    return Math.sign(base) * Math.pow(Math.abs(base), exp);
  },
  toMathString: (args) => `(${args[0]}^${args[1]})`,
  toGLSL: (args) => {
    const safeExp = `clamp(${args[1]}, -3.0, 3.0)`;
    return `(sign(${args[0]}) * pow(abs(${args[0]}), ${safeExp}))`;
  },
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── pow\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'pow',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

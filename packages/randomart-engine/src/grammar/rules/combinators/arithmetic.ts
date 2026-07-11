import type { GrammarRule } from '../../../types';

export const addRule = {
  id: 'add',
  name: 'Blend',
  arity: 2,
  weight: 1.0,
  category: 'structural',
  evaluate: (args) => (args[0]() + args[1]()) * 0.5, // Multiplication is slightly faster than division
  toMathString: (args) => `((${args[0]} + ${args[1]}) / 2)`,
  toGLSL: (args) => `((${args[0]} + ${args[1]}) * 0.5)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── add\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'add',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

export const multiplyRule = {
  id: 'multiply',
  name: 'Mix',
  arity: 2,
  weight: 1.0, // High structural variety
  category: 'structural',
  evaluate: (args) => args[0]() * args[1](),
  toMathString: (args) => `(${args[0]} · ${args[1]})`,
  toGLSL: (args) => `(${args[0]} * ${args[1]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── multiply\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'multiply',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

export const moduloRule = {
  id: 'modulo',
  name: 'Bands',
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

export const powRule = {
  id: 'pow',
  name: 'Curve',
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
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── pow\n${args[0]}${args[1]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'pow',
    args: [buildChild(), buildChild()]
  })
} satisfies GrammarRule;

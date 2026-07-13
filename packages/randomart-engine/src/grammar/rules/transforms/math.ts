import type { GrammarRule } from '../../../types';

export const absRule = {
  id: 'abs',
  name: 'Absolute Value',
  arity: 1,
  weight: 1.0,
  category: 'structural',
  evaluate: (args) => Math.abs(args[0]?.() ?? 0),
  toMathString: (args) => `|${args[0] ?? '0.0'}|`,
  toGLSL: (args) => `abs(${args[0] ?? '0.0'})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── abs\n${args[0] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'abs',
    args: [buildChild()]
  })
} as const satisfies GrammarRule;

export const sqrtRule = {
  id: 'sqrt',
  name: 'Square Root',
  arity: 1,
  weight: 0.8,
  category: 'structural',
  evaluate: (args) => Math.sqrt(Math.abs(args[0]?.() ?? 0) + 1e-10),
  toMathString: (args) => `sqrt(|${args[0] ?? '0.0'}|)`,
  toGLSL: (args) => `sqrt(abs(${args[0] ?? '0.0'}) + 1e-10)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── sqrt\n${args[0] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'sqrt',
    args: [buildChild()]
  })
} as const satisfies GrammarRule;

export const expRule = {
  id: 'exp',
  name: 'Exponential',
  arity: 1,
  weight: 0.8, // Lowered weight slightly because exp climbs aggressively
  category: 'structural',
  evaluate: (args) => {
    const val = Math.max(-1.0, Math.min(1.0, args[0]?.() ?? 0));
    return ((Math.exp(val) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0;
  },
  toMathString: (args) => `normalized_e^(${args[0] ?? '0.0'})`,
  toGLSL: (args) => {
    const clamped = `clamp(${args[0] ?? '0.0'}, -1.0, 1.0)`;
    return `(((exp(${clamped}) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0)`;
  },
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── exp\n${args[0] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'exp',
    args: [buildChild()]
  })
} as const satisfies GrammarRule;

export const logRule = {
  id: 'log',
  name: 'Logarithm',
  arity: 1,
  weight: 0.8,
  category: 'structural',
  evaluate: (args) => {
    const val = Math.abs(args[0]?.() ?? 0);
    return (Math.log(val + 1.0) / 0.69314718056) * 2.0 - 1.0;
  },
  toMathString: (args) => `normalized_log(${args[0] ?? '0.0'})`,
  toGLSL: (args) => `((log(abs(${args[0] ?? '0.0'}) + 1.0) / 0.69314718056) * 2.0 - 1.0)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── log\n${args[0] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'log',
    args: [buildChild()]
  })
} as const satisfies GrammarRule;

export const fractRule = {
  id: 'fract',
  name: 'Fractional Part',
  arity: 1,
  weight: 0.6,
  category: 'structural',
  evaluate: (args) => {
    const v = args[0]?.() ?? 0;
    return (v - Math.floor(v)) * 2.0 - 1.0;
  },
  toMathString: (args) => `fract(${args[0] ?? '0.0'})`,
  toGLSL: (args) => `(fract(${args[0] ?? '0.0'}) * 2.0 - 1.0)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── fract\n${args[0] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'fract',
    args: [buildChild()]
  })
} as const satisfies GrammarRule;

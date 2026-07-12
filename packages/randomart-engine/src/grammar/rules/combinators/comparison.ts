import type { GrammarRule } from '../../../types';

export const lessThanRule = {
  id: 'less-than',
  name: 'Cliff',
  arity: 2,
  weight: 0.4, // Keep low: Step functions create harsh line artifacts
  category: 'structural',
  evaluate: (args) => {
    const a = args[0]?.() ?? 0;
    const b = args[1]?.() ?? 0;
    return a < b ? 1.0 : -1.0;
  },
  toMathString: (args) => `(${args[0] ?? '0.0'} < ${args[1] ?? '0.0'} ? 1 : -1)`,
  toGLSL: (args) => `(${args[0] ?? '0.0'} < ${args[1] ?? '0.0'} ? 1.0 : -1.0)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── less-than\n${args[0] ?? ''}${args[1] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'less-than',
    args: [buildChild(), buildChild()]
  })
} as const satisfies GrammarRule;

export const greaterThanRule = {
  id: 'greater-than',
  name: 'Peak',
  arity: 2,
  weight: 0.4, // Keep low: Step functions create harsh, non-organic line artifacts
  category: 'structural',
  evaluate: (args) => {
    const a = args[0]?.() ?? 0;
    const b = args[1]?.() ?? 0;
    return a > b ? 1.0 : -1.0;
  },
  toMathString: (args) => `(${args[0] ?? '0.0'} > ${args[1] ?? '0.0'} ? 1 : -1)`,
  toGLSL: (args) => `(${args[0] ?? '0.0'} > ${args[1] ?? '0.0'} ? 1.0 : -1.0)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── greater-than\n${args[0] ?? ''}${args[1] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'greater-than',
    args: [buildChild(), buildChild()]
  })
} as const satisfies GrammarRule;

export const stepRule = {
  id: 'step',
  name: 'Ridge',
  arity: 2,
  weight: 0.4,
  category: 'structural',
  evaluate: (args) => {
    const a = args[0]?.() ?? 0;
    const b = args[1]?.() ?? 0;
    return a >= b ? 1.0 : -1.0;
  },
  toMathString: (args) => `step(${args[0] ?? '0.0'}, ${args[1] ?? '0.0'})`,
  toGLSL: (args) => `(2.0 * step(${args[0] ?? '0.0'}, ${args[1] ?? '0.0'}) - 1.0)`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── step\n${args[0] ?? ''}${args[1] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'step',
    args: [buildChild(), buildChild()]
  })
} as const satisfies GrammarRule;

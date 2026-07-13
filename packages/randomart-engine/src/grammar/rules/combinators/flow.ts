import type { GrammarRule } from '../../../types';

export const ifRule = {
  id: 'if',
  name: 'Conditional',
  arity: 3,
  weight: 0.6,
  category: 'structural',
  evaluate: (args) => {
    const condition = args[0]?.() ?? 0;
    const trueBranch = args[1]?.() ?? 0;
    const falseBranch = args[2]?.() ?? 0;
    return condition > 0.0 ? trueBranch : falseBranch;
  },
  toMathString: (args) =>
    `(if ${args[0] ?? '0.0'} > 0 ? ${args[1] ?? '0.0'} : ${args[2] ?? '0.0'})`,
  toGLSL: (args) => `(${args[0] ?? '0.0'} > 0.0 ? ${args[1] ?? '0.0'} : ${args[2] ?? '0.0'})`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── if\n${args[0] ?? ''}${args[1] ?? ''}${args[2] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'if',
    args: [buildChild(), buildChild(), buildChild()]
  })
} as const satisfies GrammarRule;

export const smoothstepRule = {
  id: 'smoothstep',
  name: 'Smoothstep',
  arity: 3,
  weight: 0.5,
  category: 'structural',
  evaluate: (args) => {
    const edge0 = args[0]?.() ?? 0;
    const edge1 = args[1]?.() ?? 1;
    const x = args[2]?.() ?? 0;
    const t = Math.max(0.0, Math.min(1.0, (x - edge0) / (edge1 - edge0 || 1)));
    return t * t * (3.0 - 2.0 * t) * 2.0 - 1.0;
  },
  toMathString: (args) =>
    `smoothstep(${args[0] ?? '0.0'}, ${args[1] ?? '0.0'}, ${args[2] ?? '0.0'})`,
  toGLSL: (args) =>
    `(2.0 * smoothstep(${args[0] ?? '0.0'}, ${args[1] ?? '0.0'}, ${args[2] ?? '0.0'}) - 1.0)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── smoothstep\n${args[0] ?? ''}${args[1] ?? ''}${args[2] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'smoothstep',
    args: [buildChild(), buildChild(), buildChild()]
  })
} as const satisfies GrammarRule;

export const clampRule = {
  id: 'clamp',
  name: 'Clamp',
  arity: 3,
  weight: 0.5,
  category: 'structural',
  evaluate: (args) => {
    const x = args[0]?.() ?? 0;
    const lo = args[1]?.() ?? 0;
    const hi = args[2]?.() ?? 0;
    return Math.min(hi, Math.max(lo, x));
  },
  toMathString: (args) => `clamp(${args[0] ?? '0.0'}, ${args[1] ?? '0.0'}, ${args[2] ?? '0.0'})`,
  toGLSL: (args) => `clamp(${args[0] ?? '0.0'}, ${args[1] ?? '0.0'}, ${args[2] ?? '0.0'})`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── clamp\n${args[0] ?? ''}${args[1] ?? ''}${args[2] ?? ''}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'clamp',
    args: [buildChild(), buildChild(), buildChild()]
  })
} as const satisfies GrammarRule;

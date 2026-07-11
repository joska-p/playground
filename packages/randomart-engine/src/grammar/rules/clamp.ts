import type { GrammarRule } from '../../types';

export const clampRule = {
  id: 'clamp',
  name: 'Clamp',
  arity: 3,
  weight: 0.5,
  category: 'structural',
  evaluate: (args) => {
    const x = args[0]();
    const lo = args[1]();
    const hi = args[2]();
    return Math.min(hi, Math.max(lo, x));
  },
  toMathString: (args) => `clamp(${args[0]}, ${args[1]}, ${args[2]})`,
  toGLSL: (args) => `clamp(${args[0]}, ${args[1]}, ${args[2]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── clamp\n${args[0]}${args[1]}${args[2]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'clamp',
    args: [buildChild(), buildChild(), buildChild()]
  })
} satisfies GrammarRule;

import type { GrammarRule } from '../../types';

export const smoothstepRule = {
  id: 'smoothstep',
  name: 'Smoothstep',
  arity: 3,
  weight: 0.5,
  category: 'structural',
  evaluate: (args) => {
    const edge0 = args[0]();
    const edge1 = args[1]();
    const x = args[2]();
    const t = Math.max(0.0, Math.min(1.0, (x - edge0) / (edge1 - edge0)));
    return t * t * (3.0 - 2.0 * t) * 2.0 - 1.0;
  },
  toMathString: (args) => `smoothstep(${args[0]}, ${args[1]}, ${args[2]})`,
  toGLSL: (args) => `(2.0 * smoothstep(${args[0]}, ${args[1]}, ${args[2]}) - 1.0)`,
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}├── smoothstep\n${args[0]}${args[1]}${args[2]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'smoothstep',
    args: [buildChild(), buildChild(), buildChild()]
  })
} satisfies GrammarRule;

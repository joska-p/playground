import type { GrammarRule } from '../../types';

export const expRule = {
  id: 'exp',
  name: 'Exp',
  arity: 1,
  weight: 0.8, // Lowered weight slightly because exp climbs aggressively
  category: 'structural',
  evaluate: (args) => {
    // Clamp input to avoid Math.exp exploding into Infinity in JavaScript
    const val = Math.max(-5.0, Math.min(5.0, args[0]()));
    return ((Math.exp(val) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0;
  },
  toMathString: (args) => `normalized_e^(${args[0]})`,
  toGLSL: (args) => {
    // Clamp in GLSL to prevent whiteout artifacts
    const clamped = `clamp(${args[0]}, -5.0, 5.0)`;
    return `(((exp(${clamped}) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0)`;
  },
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── exp\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({
    ruleId: 'exp',
    args: [buildChild()]
  })
} satisfies GrammarRule;

import type { GrammarRule } from '../../types';

export const bandedNoiseRule = {
  id: 'banded-noise',
  name: 'Banded Noise',
  arity: 0,
  weight: 0.6,
  category: 'structural',
  evaluate: (_args, x, y) => {
    const n = Math.sin(x) * Math.cos(y);
    const bands = 8.0;
    return Math.floor(n * bands) / bands;
  },
  toMathString: () => 'bandedNoise(p)',
  toGLSL: () => 'bandedNoise(p)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── banded-noise\n`,
  buildNode: () => ({ ruleId: 'banded-noise', args: [] })
} satisfies GrammarRule;

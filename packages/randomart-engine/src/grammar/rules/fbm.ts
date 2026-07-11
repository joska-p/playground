import type { GrammarRule } from '../../types';

export const fbmRule = {
  id: 'fbm',
  name: 'FBM Noise',
  arity: 0,
  weight: 0.8,
  category: 'structural',
  evaluate: (_args, x, y) => {
    let value = 0.0;
    let amplitude = 0.5;
    let px = x;
    let py = y;
    for (let i = 0; i < 5; i++) {
      const n = Math.sin(px * 12.9898 + py * 78.233) * 43758.5453;
      value += amplitude * ((n - Math.floor(n)) * 2.0 - 1.0);
      px *= 2.0;
      py *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  },
  toMathString: () => 'fbm(p)',
  toGLSL: () => 'fbmNoise(p)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── fbm\n`,
  buildNode: () => ({ ruleId: 'fbm', args: [] })
} satisfies GrammarRule;

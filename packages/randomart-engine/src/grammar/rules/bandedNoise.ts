import type { GrammarRule } from '../../types';

function hash1(n: number): number {
  return (((Math.sin(n * 127.1) * 43758.5453) % 1) + 1) % 1;
}

function smoothNoise(t: number): number {
  const i = Math.floor(t);
  const f = t - i;
  const u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return hash1(i) * (1 - u) + hash1(i + 1) * u;
}

export const bandedNoiseRule = {
  id: 'banded-noise',
  name: 'Banded Noise',
  arity: 0,
  weight: 0.6,
  category: 'structural',
  evaluate: (_args, x, y) => {
    const n = smoothNoise(x * 3.0) * smoothNoise(y * 3.0);
    const bands = 6.0;
    return Math.floor(n * bands) / bands;
  },
  toMathString: () => 'bandedNoise(p)',
  toGLSL: () => 'bandedNoise(p)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── banded-noise\n`,
  buildNode: () => ({ ruleId: 'banded-noise', args: [] })
} satisfies GrammarRule;

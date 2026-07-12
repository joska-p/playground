import type { GrammarRule } from '../../../types';

export const fbmRule = {
  id: 'fbm',
  name: 'Cloud',
  arity: 0,
  weight: 0.8,
  category: 'terminal',
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
} as const satisfies GrammarRule;

export const voronoiRule = {
  id: 'voronoi',
  name: 'Cells',
  arity: 0,
  weight: 0.7,
  category: 'terminal',
  evaluate: (_args, x, y) => {
    const gx = Math.floor(x * 3.0);
    const gy = Math.floor(y * 3.0);
    let minDist = 999.0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const cx = gx + dx + 0.5 + Math.sin((gx + dx) * 127.1 + (gy + dy) * 311.7) * 0.4;
        const cy = gy + dy + 0.5 + Math.cos((gx + dx) * 269.5 + (gy + dy) * 183.3) * 0.4;
        const dist = Math.sqrt((x * 3.0 - cx) ** 2 + (y * 3.0 - cy) ** 2);
        if (dist < minDist) minDist = dist;
      }
    }
    return minDist * 2.0 - 1.0;
  },
  toMathString: () => 'voronoi(p)',
  toGLSL: () => 'voronoiCells(p)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── voronoi\n`,
  buildNode: () => ({ ruleId: 'voronoi', args: [] })
} as const satisfies GrammarRule;

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
  name: 'Grain',
  arity: 0,
  weight: 0.6,
  category: 'terminal',
  evaluate: (_args, x, y) => {
    const n = smoothNoise(x * 3.0) * smoothNoise(y * 3.0);
    const bands = 6.0;
    return Math.floor(n * bands) / bands;
  },
  toMathString: () => 'bandedNoise(p)',
  toGLSL: () => 'bandedNoise(p)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── banded-noise\n`,
  buildNode: () => ({ ruleId: 'banded-noise', args: [] })
} as const satisfies GrammarRule;

export const recamanPatternRule = {
  id: 'recaman-pattern',
  name: 'Spiral',
  arity: 0,
  weight: 0.7,
  category: 'terminal',

  // CPU-side evaluation matching the GLSL behavior
  evaluate: (_args, x, y) => {
    const d = Math.sqrt(x * x + y * y);
    // Mimic the pseudo-random step check without an actual history array
    const step = Math.floor(d * 10.0);
    let val = 0.0;
    for (let i = 1; i < 12; i++) {
      if (i > step) break;
      const raw = Math.sin(val * 12.9898) * 43758.5453;
      const flip = raw - Math.floor(raw);
      if (flip > 0.5 && val - i > 0.0) {
        val -= i;
      } else {
        val += i;
      }
    }
    return (val % 5.0) / 5.0;
  },

  toMathString: () => 'recaman(p)',
  toGLSL: () => 'pseudoRecaman(p)',

  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── recaman-pattern\n`,

  buildNode: () => {
    const xNode = { ruleId: 'x', args: [] };
    const yNode = { ruleId: 'y', args: [] };
    return {
      ruleId: 'recaman-pattern',
      args: [xNode, yNode]
    };
  }
} as const satisfies GrammarRule;

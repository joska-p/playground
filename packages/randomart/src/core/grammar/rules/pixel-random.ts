import type { GrammarRule } from '../../types';

function pixelHash(x: number, y: number): number {
  // Use absolute values to match standard positive noise properties
  const dot = Math.abs(x) * 12.9898 + Math.abs(y) * 78.233;
  const val = Math.sin(dot) * 43758.5453;
  return val - Math.floor(val);
}

export const pixelRandomRule = {
  id: 'random',
  name: 'Pixel Random',
  arity: 0,
  weight: 2,
  category: 'terminal',
  evaluate: (_args, x, y) => pixelHash(x, y) * 2 - 1,
  toMathString: () => 'random',
  toGLSL: () =>
    '(random2d(vec2(v_texCoord.x * 2.0 - 1.0, 1.0 - 2.0 * v_texCoord.y)) * 2.0 - 1.0)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── random\n`,
  buildNode: () => ({
    ruleId: 'random',
    args: []
  })
} satisfies GrammarRule;

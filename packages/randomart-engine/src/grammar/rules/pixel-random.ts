import type { GrammarRule } from '../../types';

export const pixelRandomRule = {
  id: 'random',
  name: 'Pixel Random',
  arity: 0,
  weight: 0.3,
  category: 'terminal',
  evaluate: (_args, x, y) => {
    const dot = Math.abs(x) * 12.9898 + Math.abs(y) * 78.233;
    const val = Math.sin(dot) * 43758.5453;
    return (val - Math.floor(val)) * 2.0 - 1.0;
  },
  toMathString: () => 'random',
  toGLSL: () => '(random2d(p) * 2.0 - 1.0)', // Seamlessly uses centered p
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── random\n`,
  buildNode: () => ({ ruleId: 'random', args: [] })
} satisfies GrammarRule;

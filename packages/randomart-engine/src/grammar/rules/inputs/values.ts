import type { SeededRandom } from '../../../random/SeededRandom';
import type { ExpressionNode, GrammarRule } from '../../../types';

export const constantRule = {
  id: 'constant',
  name: 'const',
  arity: 0,
  weight: 0.5, // Lowered weight slightly so trees don't collapse into dead constants too early
  category: 'terminal',
  // Clean parameter names, matching the updated GrammarRule signature perfectly
  evaluate: (_args, _x, _y, _t, node) => node?.constantValue ?? 0.0,
  toMathString: (_args, node) => node?.constantValue?.toFixed(2) ?? '0.0',
  toGLSL: (_args, node) => node?.constantValue?.toFixed(6) ?? '0.0',
  toTreeView: (_args, depth, node) =>
    `${'  '.repeat(depth)}└── const(${node?.constantValue?.toFixed(2) ?? '0.0'})\n`,
  buildNode: (rng: SeededRandom): ExpressionNode => ({
    ruleId: 'constant',
    args: [],
    constantValue: rng.next() * 2.0 - 1.0 // Range: [-1, 1]
  })
} as const satisfies GrammarRule;

export const pixelRandomRule = {
  id: 'random',
  name: 'prandom',
  arity: 0,
  weight: 0.3,
  category: 'terminal',
  noiseDependencies: ['random2d'],
  evaluate: (_args, x, y) => {
    const dot = Math.abs(x) * 12.9898 + Math.abs(y) * 78.233;
    const val = Math.sin(dot) * 43758.5453;
    return (val - Math.floor(val)) * 2.0 - 1.0;
  },
  toMathString: () => 'random',
  toGLSL: () => '(random2d(p) * 2.0 - 1.0)', // Seamlessly uses centered p
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── random\n`,
  buildNode: () => ({ ruleId: 'random', args: [] })
} as const satisfies GrammarRule;

import type { GrammarRule } from '../../../types';

export const radialRule = {
  id: 'radial',
  name: 'Radial Distance',
  arity: 0,
  weight: 0.6,
  category: 'terminal',
  evaluate: (_args, x, y) => Math.sqrt(x * x + y * y) * 2.0 - 1.0,
  toMathString: () => 'radial(p)',
  toGLSL: () => '(length(p) * 2.0 - 1.0)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── radial\n`,
  buildNode: () => ({ ruleId: 'radial', args: [] })
} as const satisfies GrammarRule;

export const sweepRule = {
  id: 'sweep',
  name: 'Angular Sweep',
  arity: 0,
  weight: 0.5,
  category: 'terminal',
  evaluate: (_args, x, y) => (Math.atan2(y, x) / Math.PI) * 2.0 - 1.0,
  toMathString: () => 'sweep(p)',
  toGLSL: () => '(atan(p.y, p.x) / 3.1415926535 * 2.0 - 1.0)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── sweep\n`,
  buildNode: () => ({ ruleId: 'sweep', args: [] })
} as const satisfies GrammarRule;

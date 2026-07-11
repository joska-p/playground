import type { GrammarRule } from '../../types';

export const atanRule = {
  id: 'atan',
  name: 'Atan Angle',
  arity: 0,
  weight: 0.5,
  category: 'terminal',
  evaluate: (_args, x, y) => (Math.atan2(y, x) / Math.PI) * 2.0 - 1.0,
  toMathString: () => 'atan(p)',
  toGLSL: () => '(atan(p.y, p.x) / 3.1415926535 * 2.0 - 1.0)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── atan\n`,
  buildNode: () => ({ ruleId: 'atan', args: [] })
} satisfies GrammarRule;

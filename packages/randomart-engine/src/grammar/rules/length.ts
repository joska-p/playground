import type { GrammarRule } from '../../types';

export const lengthRule = {
  id: 'length',
  name: 'Length',
  arity: 0,
  weight: 0.6,
  category: 'terminal',
  evaluate: (_args, x, y) => Math.sqrt(x * x + y * y) * 2.0 - 1.0,
  toMathString: () => 'length(p)',
  toGLSL: () => '(length(p) * 2.0 - 1.0)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── length\n`,
  buildNode: () => ({ ruleId: 'length', args: [] })
} satisfies GrammarRule;

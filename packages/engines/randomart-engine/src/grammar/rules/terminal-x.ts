import type { GrammarRule } from '../../types';

export const terminalXRule = {
  id: 'x',
  name: 'Terminal X',
  arity: 0,
  weight: 1.0,
  category: 'terminal',
  evaluate: (_args, x) => x,
  toMathString: () => 'x',
  toGLSL: () => 'p.x',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── x\n`,
  buildNode: () => ({ ruleId: 'x', args: [] })
} satisfies GrammarRule;

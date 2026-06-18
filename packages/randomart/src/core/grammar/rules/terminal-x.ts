import type { GrammarRule } from '../types';

export const terminalXRule = {
  id: 'x',
  name: 'Terminal X',
  arity: 0,
  evaluate: () => 0,
  toMathString: () => 'x',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── x\n`,
  buildNode: () => ({ ruleId: 'x', args: [] })
} satisfies GrammarRule;

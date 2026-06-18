import type { GrammarRule } from '../types';

export const terminalYRule = {
  id: 'y',
  name: 'Terminal Y',
  arity: 0,
  evaluate: () => 0,
  toMathString: () => 'y',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── y\n`,
  buildNode: () => ({ ruleId: 'y', args: [] })
} satisfies GrammarRule;

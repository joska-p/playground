import type { GrammarRule } from '../types';

export const terminalTRule = {
  id: 't',
  name: 'Terminal T',
  arity: 0,
  weight: 2,
  evaluate: () => 0,
  toMathString: () => 't',
  toGLSL: () => 'u_time',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── t\n`,
  buildNode: () => ({ ruleId: 't', args: [] })
} satisfies GrammarRule;

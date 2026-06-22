import type { GrammarRule } from '../../types';

export const terminalYRule = {
  id: 'y',
  name: 'Terminal Y',
  arity: 0,
  weight: 1.0,
  category: 'terminal',
  evaluate: (_args, _x, y) => y,
  toMathString: () => 'y',
  toGLSL: () => 'p.y', // Directly maps to centered Y
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── y\n`,
  buildNode: () => ({ ruleId: 'y', args: [] })
} satisfies GrammarRule;

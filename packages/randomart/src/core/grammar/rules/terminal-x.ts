import type { GrammarRule } from '../../types';

export const terminalXRule = {
  id: 'x',
  name: 'Terminal X',
  arity: 0,
  weight: 2,
  evaluate: (_args, x) => x,
  toMathString: () => 'x',
  toGLSL: () => '(v_texCoord.x * 2.0 - 1.0)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── x\n`,
  buildNode: () => ({ ruleId: 'x', args: [] })
} satisfies GrammarRule;

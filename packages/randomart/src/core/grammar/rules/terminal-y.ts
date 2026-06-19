import type { GrammarRule } from '../../types';

export const terminalYRule = {
  id: 'y',
  name: 'Terminal Y',
  arity: 0,
  weight: 2,
  evaluate: (_args, _x, y) => y,
  toMathString: () => 'y',
  toGLSL: () => '(1.0 - 2.0 * v_texCoord.y)',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── y\n`,
  buildNode: () => ({ ruleId: 'y', args: [] })
} satisfies GrammarRule;

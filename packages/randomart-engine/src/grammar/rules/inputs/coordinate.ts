import type { GrammarRule } from '../../../types';

export const terminalXRule = {
  id: 'x',
  name: 'Horizontal',
  arity: 0,
  weight: 1.0,
  category: 'terminal',
  evaluate: (_args, x) => x,
  toMathString: () => 'x',
  toGLSL: () => 'p.x',
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── x\n`,
  buildNode: () => ({ ruleId: 'x', args: [] })
} as const satisfies GrammarRule;

export const terminalYRule = {
  id: 'y',
  name: 'Vertical',
  arity: 0,
  weight: 1.0,
  category: 'terminal',
  evaluate: (_args, _x, y) => y,
  toMathString: () => 'y',
  toGLSL: () => 'p.y', // Directly maps to centered Y
  toTreeView: (_args, depth) => `${'  '.repeat(depth)}└── y\n`,
  buildNode: () => ({ ruleId: 'y', args: [] })
} as const satisfies GrammarRule;

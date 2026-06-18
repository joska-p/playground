import type { SeededRandom } from '../../SeededRandom';
import type { ExpressionNode } from '../../types';
import type { GrammarRule } from '../types';

export const constantRule = {
  id: 'constant',
  name: 'Constant',
  arity: 0,
  weight: 2,
  evaluate: (args) => args[0](),
  toMathString: (args) => args[0],
  toGLSL: (args) => args[0],
  toTreeView: (args, depth) => `${'  '.repeat(depth)}└── const(${args[0]})\n`,
  buildNode: (rng: SeededRandom) => {
    const value = rng.next() * 2 - 1;
    return {
      ruleId: 'constant',
      args: [],
      constantValue: value
    } satisfies ExpressionNode;
  }
} satisfies GrammarRule;

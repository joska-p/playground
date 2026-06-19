import type { SeededRandom } from '../../random/SeededRandom';
import type { ExpressionNode, GrammarRule } from '../../types';

export const constantRule = {
  id: 'constant',
  name: 'Constant',
  arity: 0,
  weight: 2,
  category: 'terminal',
  evaluate: () => 0.0,
  toMathString: (args) => args[0] ?? '0.0',
  toGLSL: (args) => args[0] ?? '0.0',
  toTreeView: (args, depth) =>
    `${'  '.repeat(depth)}└── const(${args[0] ?? '0.0'})\n`,
  buildNode: (rng: SeededRandom) => {
    const value = rng.next() * 2 - 1;
    return {
      ruleId: 'constant',
      args: [],
      constantValue: value
    } satisfies ExpressionNode;
  }
} satisfies GrammarRule;

import type { SeededRandom } from '../SeededRandom';
import type { ExpressionNode } from '../types';

export type GrammarRule = {
  id: string;
  name: string;
  arity: 0 | 1 | 2;
  evaluate: (args: number[], x: number, y: number) => number;
  toMathString: (args: string[]) => string;
  toTreeView: (args: string[], depth: number) => string;
  buildNode: (
    rng: SeededRandom,
    buildChild: () => ExpressionNode
  ) => ExpressionNode;
};

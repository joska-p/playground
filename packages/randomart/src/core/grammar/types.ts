import type { SeededRandom } from '../SeededRandom';
import type { ExpressionNode } from '../types';

export type GrammarRule = {
  id: string;
  name: string;
  arity: number;
  weight: number;

  // Update args to use lazy thunks so conditional branching works!
  evaluate: (args: (() => number)[], x: number, y: number, t: number) => number;

  toMathString: (args: string[]) => string;
  toTreeView: (args: string[], depth: number) => string;
  buildNode: (
    rng: SeededRandom,
    buildChild: () => ExpressionNode
  ) => ExpressionNode;
};

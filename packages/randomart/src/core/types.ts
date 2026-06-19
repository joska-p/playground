import type { SeededRandom } from './random/SeededRandom';

export type ExpressionNode = {
  ruleId: string;
  args: ExpressionNode[];
  constantValue?: number;
};

export type RenderTask = {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rowStart: number;
  rowEnd: number;
  size: number;
  time: number;
};

export type RenderResult = {
  rowStart: number;
  buffer: Uint8ClampedArray;
};

export type GrammarRule = {
  id: string;
  name: string;
  arity: number;
  weight: number;
  category: 'structural' | 'terminal';

  // Update args to use lazy thunks so conditional branching works!
  evaluate: (args: (() => number)[], x: number, y: number, t: number) => number;

  toMathString: (args: string[]) => string;
  toGLSL: (args: string[]) => string;
  toTreeView: (args: string[], depth: number) => string;
  buildNode: (
    rng: SeededRandom,
    buildChild: () => ExpressionNode
  ) => ExpressionNode;
};

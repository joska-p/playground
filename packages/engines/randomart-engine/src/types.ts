import type { SeededRandom } from './random/SeededRandom';

export type ExpressionNode = {
  ruleId: string;
  args: ExpressionNode[];
  constantValue?: number;
};

export type GrammarRule = {
  id: string;
  name: string;
  arity: number;
  weight: number;
  category: 'structural' | 'terminal';

  evaluate: (args: (() => number)[], x: number, y: number, t: number) => number;

  toMathString: (args: string[]) => string;
  toGLSL: (args: string[]) => string;
  toTreeView: (args: string[], depth: number) => string;
  buildNode: (
    rng: SeededRandom,
    buildChild: () => ExpressionNode
  ) => ExpressionNode;
};

export type AnimationBehavior = {
  id: string;
  name: string;
  glslFunction: string;
  type: 'spatial' | 'color';
  applyCode: (timeVar: string, speedVar: string) => string;
};

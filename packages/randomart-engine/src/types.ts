import type { GlslFunctionsNames } from './compile/glslLibrary';
import type { RuleId as RuleIdInternal } from './grammar/registry';
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

  evaluate: (
    args: (() => number)[],
    x: number,
    y: number,
    t: number,
    node?: ExpressionNode
  ) => number;
  toMathString: (args: string[], node?: ExpressionNode) => string;
  toGLSL: (args: string[], node?: ExpressionNode) => string;
  toTreeView: (args: string[], depth: number, node?: ExpressionNode) => string;

  buildNode: (rng: SeededRandom, buildChild: () => ExpressionNode) => ExpressionNode;
  noiseDependencies?: GlslFunctionsNames[];
};

export type RuleId = RuleIdInternal;
export type RuleWeight = Record<RuleId, number>;
export type RuleWeights = Partial<RuleWeight>;

export type AnimationBehavior = {
  id: string;
  name: string;
  glslFunction: string;
  type: 'spatial' | 'color';
  applyCode: (timeVar: string, speedVar: string) => string;
  noiseDependencies?: GlslFunctionsNames[];
};

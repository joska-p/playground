import type { ExprNode, OperatorId } from '@repo/randomart-engine-next';

export type Mode = 'test' | 'play';

export type RandomartState = {
  mode: Mode;
  seedText: string;
  activeChannel: 'red' | 'green' | 'blue';
  selectedRuleId: string;
  customOperators: OperatorId[] | null;
  minDepth: number;
  maxDepth: number;
  treeR: ExprNode;
  treeG: ExprNode;
  treeB: ExprNode;
  running: boolean;
  time: number;
  animationSpeed: number;
  correlatedRGB: boolean;
  activeAnimationBehaviorIds: string[];
};

import type { ExprNode } from '@repo/randomart-engine-next';

export type Mode = 'test' | 'play';

export type RandomartState = {
  mode: Mode;
  seedText: string;
  activeChannel: 'red' | 'green' | 'blue';
  maxDepth: number;
  enabledRuleIds: string[];
  treeR: ExprNode;
  treeG: ExprNode;
  treeB: ExprNode;
  running: boolean;
  time: number;
  animationSpeed: number;
  correlatedRGB: boolean;
  activeAnimationBehaviorIds: string[];
};

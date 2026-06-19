import type { SeededRandom } from '../../core/random/SeededRandom';
import type { ExpressionNode } from '../../core/types';

export type RandomartState = {
  seedText: string;
  activeChannel: 'red' | 'green' | 'blue';
  maxDepth: number;
  enabledRuleIds: string[];
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rngR: SeededRandom;
  rngG: SeededRandom;
  rngB: SeededRandom;
  running: boolean;
  time: number;
  animationSpeed: number;
  renderMode: 'canvas' | 'glsl';
  correlatedRGB: boolean;
  activeAnimationBehaviorIds: string[];
};

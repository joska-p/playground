import type { SeededRandom } from '@repo/randomart-engine/random/SeededRandom';
import type { ExpressionNode, RuleId, RuleWeights } from '@repo/randomart-engine/types';

export type RandomartState = {
  seedText: string;
  activeChannel: 'red' | 'green' | 'blue';
  maxDepth: number;
  enabledRuleIds: RuleId[];
  ruleWeights: RuleWeights;
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rngR: SeededRandom;
  rngG: SeededRandom;
  rngB: SeededRandom;
  running: boolean;
  time: number;
  animationSpeed: number;
  correlatedRGB: boolean;
  activeAnimationBehaviorIds: string[];
};

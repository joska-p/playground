import type {
  BehaviorId,
  ColorSpaceId,
  Node,
  OperatorId,
  RuleId
} from '@repo/randomart-engine-next/types';
export type { ColorSpaceId } from '@repo/randomart-engine-next/types';

export type Mode = 'test' | 'play';

export type RandomartState = {
  mode: Mode;
  seedText: string;
  activeChannel: 'red' | 'green' | 'blue';
  selectedRuleId: RuleId;
  customOperatorIds: OperatorId[] | null;
  minDepth: number;
  maxDepth: number;
  treeR: Node;
  treeG: Node;
  treeB: Node;
  running: boolean;
  time: number;
  animationSpeed: number;
  activeBehaviorIds: BehaviorId[];
  colorSpace: ColorSpaceId;
  correlatedRGB: boolean;
};

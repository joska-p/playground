import { getRule } from '@repo/randomart-engine-next/rules';
import { buildChannelTrees } from '@repo/randomart-engine-next/tree';
import type { Node, OperatorId, RuleId } from '@repo/randomart-engine-next/types';

export type TreeOutput = {
  treeR: Node;
  treeG: Node;
  treeB: Node;
};

export type TreeConfig = {
  seedText: string;
  selectedRuleId: RuleId;
  customOperatorIds: OperatorId[] | null;
  minDepth: number;
  maxDepth: number;
  correlated: boolean;
};

export function generateTrees(config: TreeConfig): TreeOutput {
  const preset = getRule(config.selectedRuleId);

  const operatorIds = config.customOperatorIds ?? preset.operatorIds;

  const rule = {
    id: config.selectedRuleId,
    label: preset.label,
    kind: preset.kind,
    operatorIds,
    minDepth: config.minDepth,
    maxDepth: config.maxDepth
  };

  const options = {
    seedText: config.seedText,
    rule,
    correlated: config.correlated
  };

  return buildChannelTrees(options);
}

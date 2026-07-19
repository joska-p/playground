import { buildChannelTrees, getRule } from '@repo/randomart-engine-next';
import type { Node, OperatorId, RuleId } from '@repo/randomart-engine-next/types';

export type TreeOutput = {
  treeR: Node;
  treeG: Node;
  treeB: Node;
};

export type TreeConfig = {
  seedText: string;
  selectedRuleId: RuleId;
  customOperators: OperatorId[] | null;
  minDepth: number;
  maxDepth: number;
  correlated: boolean;
};

export function generateTrees(config: TreeConfig): TreeOutput {
  const preset = getRule(config.selectedRuleId);

  const operators = config.customOperators ?? preset.operators;

  const rule = {
    id: config.selectedRuleId,
    label: preset.label,
    kind: preset.kind,
    operators,
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

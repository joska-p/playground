import { buildChannelTrees, getRule } from '@repo/randomart-engine-next';
import type { ExprNode, OperatorId, RuleId } from '@repo/randomart-engine-next/types';

export type TreeOutput = {
  treeR: ExprNode;
  treeG: ExprNode;
  treeB: ExprNode;
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

  const spec = {
    id: config.selectedRuleId,
    label: preset.label,
    kind: preset.kind,
    operators,
    minDepth: config.minDepth,
    maxDepth: config.maxDepth
  };

  return buildChannelTrees(config.seedText, spec, config.correlated);
}

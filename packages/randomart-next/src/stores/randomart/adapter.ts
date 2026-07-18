import { generateTrees as engineGenerateTrees, getRule } from '@repo/randomart-engine-next';
import type { ExprNode, OperatorId } from '@repo/randomart-engine-next/types';

export type TreeOutput = {
  treeR: ExprNode;
  treeG: ExprNode;
  treeB: ExprNode;
};

export type TreeConfig = {
  seedText: string;
  selectedRuleId: string;
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
    displayName: preset.displayName,
    category: preset.category,
    operators,
    minDepth: config.minDepth,
    maxDepth: config.maxDepth
  };

  return engineGenerateTrees({
    seedText: config.seedText,
    spec,
    correlated: config.correlated
  });
}

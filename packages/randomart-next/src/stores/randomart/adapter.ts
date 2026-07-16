import type { ExprNode, OperatorId } from '@repo/randomart-engine-next';
import { createRule, getRule } from '@repo/randomart-engine-next';

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
};

export function generateTrees(config: TreeConfig): TreeOutput {
  const preset = getRule(config.selectedRuleId);

  const operators = config.customOperators ?? preset.operators;

  const spec = {
    id: config.selectedRuleId,
    displayName: preset.displayName,
    operators,
    minDepth: config.minDepth,
    maxDepth: config.maxDepth
  };

  const rule = createRule(spec);

  return {
    treeR: rule.buildNode(`${config.seedText}_red`),
    treeG: rule.buildNode(`${config.seedText}_green`),
    treeB: rule.buildNode(`${config.seedText}_blue`)
  };
}

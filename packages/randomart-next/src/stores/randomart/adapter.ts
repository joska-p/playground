import type { ExprNode, OperatorId } from '@repo/randomart-engine-next';
import { createRule, getRule, listRules } from '@repo/randomart-engine-next';

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
  const preset = getRule(config.selectedRuleId) ?? listRules()[0];

  if (!preset) {
    throw new Error('No rules registered');
  }

  const operators = config.customOperators ?? preset.operators;

  const spec = {
    id: config.selectedRuleId,
    displayName: preset.displayName,
    operators,
    minDepth: config.minDepth,
    maxDepth: config.maxDepth
  };

  const rule = createRule(spec);

  if (config.correlated) {
    const node = rule.buildNode(config.seedText);
    return { treeR: node, treeG: node, treeB: node };
  }

  return {
    treeR: rule.buildNode(`${config.seedText}_red`),
    treeG: rule.buildNode(`${config.seedText}_green`),
    treeB: rule.buildNode(`${config.seedText}_blue`)
  };
}

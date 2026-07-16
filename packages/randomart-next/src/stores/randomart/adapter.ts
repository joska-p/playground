import type { ExprNode } from '@repo/randomart-engine-next';
import { listRules } from '@repo/randomart-engine-next';

export type TreeOutput = {
  treeR: ExprNode;
  treeG: ExprNode;
  treeB: ExprNode;
};

export type TreeConfig = {
  seedText: string;
  enabledRuleIds: string[];
  correlated: boolean;
};

export function generateTrees(config: TreeConfig): TreeOutput {
  const enabledRules = listRules().filter((r) => config.enabledRuleIds.includes(r.id));
  const rule = enabledRules.length > 0 ? enabledRules[0] : listRules()[0];

  if (!rule) {
    throw new Error('No rules registered');
  }

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

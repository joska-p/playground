import { OPERATORS } from '@repo/randomart-engine-next/operators';
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

const CANONICAL_ORDER = Object.keys(OPERATORS) as OperatorId[];

function canonicalSort(ids: OperatorId[]): OperatorId[] {
  const index = new Map(CANONICAL_ORDER.map((id, i) => [id, i]));
  return [...ids].sort((a, b) => (index.get(a) ?? 0) - (index.get(b) ?? 0));
}

export function generateTrees(config: TreeConfig): TreeOutput {
  const preset = getRule(config.selectedRuleId);

  const operatorIds = canonicalSort(config.customOperatorIds ?? preset.operatorIds);

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

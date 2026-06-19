import { getAllRules } from '../../../core/grammar/registry';
import { SeededRandom } from '../../../core/random/SeededRandom';
import { buildTree } from '../../../core/tree/build';
import type { ExpressionNode } from '../../../core/types';

export type TreeConfig = {
  seedText: string;
  maxDepth: number;
  enabledRuleIds: string[];
  correlated: boolean;
};

export type TreeOutput = {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rngR: SeededRandom;
  rngG: SeededRandom;
  rngB: SeededRandom;
};

export function generateTrees(config: TreeConfig): TreeOutput {
  const rules = getAllRules().filter((r) =>
    config.enabledRuleIds.includes(r.id)
  );

  if (config.correlated) {
    const rng = new SeededRandom(config.seedText + '_rgb');
    const tree = {
      ruleId: 'vec3',
      args: [
        buildTree(rng, rng, 0, config.maxDepth, rules),
        buildTree(rng, rng, 0, config.maxDepth, rules),
        buildTree(rng, rng, 0, config.maxDepth, rules)
      ]
    };
    return {
      treeR: tree,
      treeG: tree,
      treeB: tree,
      rngR: rng,
      rngG: rng,
      rngB: rng
    };
  }

  const structureRng = new SeededRandom(config.seedText + '_structure');
  const rngR = new SeededRandom(config.seedText + '_red');
  const rngG = new SeededRandom(config.seedText + '_green');
  const rngB = new SeededRandom(config.seedText + '_blue');

  const treeR = buildTree(structureRng, rngR, 0, config.maxDepth, rules);
  const treeG = buildTree(structureRng, rngG, 0, config.maxDepth, rules);
  const treeB = buildTree(structureRng, rngB, 0, config.maxDepth, rules);

  return { treeR, treeG, treeB, rngR, rngG, rngB };
}

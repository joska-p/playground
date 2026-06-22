import { getAllRules } from '../grammar/registry';
import { SeededRandom } from '../random/SeededRandom';
import type { ExpressionNode } from '../types';
import { buildTree } from './build';

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
    // All three channels share one RNG stream so they get the same structural
    // decisions, but they're built as separate trees — no aliasing.
    const rng = new SeededRandom(config.seedText + '_rgb');
    return {
      treeR: buildTree(rng, rng, 0, config.maxDepth, rules),
      treeG: buildTree(rng, rng, 0, config.maxDepth, rules),
      treeB: buildTree(rng, rng, 0, config.maxDepth, rules),
      rngR: rng,
      rngG: rng,
      rngB: rng
    };
  }

  // Mix the base seed string with unique properties so structural hashes change completely
  const structureRng = new SeededRandom(
    `${config.seedText}_struct_${config.maxDepth}`
  );
  const rngR = new SeededRandom(`${config.seedText}_red`);
  const rngG = new SeededRandom(`${config.seedText}_green`);
  const rngB = new SeededRandom(`${config.seedText}_blue`);

  return {
    treeR: buildTree(structureRng, rngR, 0, config.maxDepth, rules),
    treeG: buildTree(structureRng, rngG, 0, config.maxDepth, rules),
    treeB: buildTree(structureRng, rngB, 0, config.maxDepth, rules),
    rngR,
    rngG,
    rngB
  };
}

import { getAllRules } from '../../../core/grammar/registry';
import { SeededRandom } from '../../../core/random/SeededRandom';
import { buildTree } from '../../../core/tree/build';
import { randomartStore } from '../store';

export function getEnabledRules(): string[] {
  return randomartStore.getState().enabledRuleIds;
}

export function regenerateTrees(
  seedText: string,
  maxDepth: number,
  correlated: boolean
) {
  const enabledIds = getEnabledRules();
  const rules = getAllRules().filter((r) => enabledIds.includes(r.id));

  if (correlated) {
    const rng = new SeededRandom(seedText + '_rgb');
    const tree = {
      ruleId: 'vec3',
      args: [
        buildTree(rng, 0, maxDepth, rules),
        buildTree(rng, 0, maxDepth, rules),
        buildTree(rng, 0, maxDepth, rules)
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

  const rngR = new SeededRandom(seedText + '_red');
  const rngG = new SeededRandom(seedText + '_green');
  const rngB = new SeededRandom(seedText + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth, rules);
  const treeG = buildTree(rngG, 0, maxDepth, rules);
  const treeB = buildTree(rngB, 0, maxDepth, rules);

  return { treeR, treeG, treeB, rngR, rngG, rngB };
}

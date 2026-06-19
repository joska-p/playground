import { getAllRules } from '../grammar/registry';
import type { SeededRandom } from '../random/SeededRandom';
import type { ExpressionNode, GrammarRule } from '../types';

function weightedPick(rng: SeededRandom, rules: GrammarRule[]): number {
  const totalWeight = rules.reduce((sum, r) => sum + r.weight, 0);
  let threshold = rng.next() * totalWeight;
  for (let i = 0; i < rules.length; i++) {
    threshold -= rules[i].weight;
    if (threshold <= 0) return i;
  }
  return rules.length - 1;
}

export function buildTree(
  structureRng: SeededRandom,
  channelRng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  rules?: GrammarRule[]
): ExpressionNode {
  const availableRules = rules ?? getAllRules();

  // Bias towards structural rules earlier in the tree, and terminals later
  const structuralProbability = 1 - currentDepth / maxDepth;

  // Use shared structural RNG for first 3 levels, then channel specific RNG
  const rngToUse = currentDepth < 3 ? structureRng : channelRng;

  const pool = availableRules.filter((r) => {
    if (r.category === 'terminal') return true;
    return rngToUse.next() < structuralProbability;
  });

  // Ensure we have at least one rule
  const finalPool =
    pool.length > 0
      ? pool
      : availableRules.filter((r) => r.category === 'terminal');

  const idx = weightedPick(rngToUse, finalPool);

  return finalPool[idx].buildNode(rngToUse, () => {
    return buildTree(
      structureRng,
      channelRng,
      currentDepth + 1,
      maxDepth,
      rules
    );
  });
}

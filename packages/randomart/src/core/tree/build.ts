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
  rng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  rules?: GrammarRule[]
): ExpressionNode {
  const availableRules = rules ?? getAllRules();

  // Bias towards structural rules earlier in the tree, and terminals later
  const structuralProbability = 1 - currentDepth / maxDepth;
  
  const pool = availableRules.filter((r) => {
    if (r.category === 'terminal') return true;
    return rng.next() < structuralProbability;
  });

  // Ensure we have at least one rule
  const finalPool = pool.length > 0 ? pool : availableRules.filter((r) => r.category === 'terminal');

  const idx = weightedPick(rng, finalPool);

  return finalPool[idx].buildNode(rng, () => {
    return buildTree(rng, currentDepth + 1, maxDepth, rules);
  });
}

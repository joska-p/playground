import { getAllRules } from '../grammar/registry';
import type { SeededRandom } from '../random/SeededRandom';
import type { ExpressionNode, GrammarRule } from '../types';

// Depth below which the shared structureRng drives category selection,
// keeping the overall tree shape consistent across R/G/B channels.
const STRUCTURE_RNG_DEPTH = 3;

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
  const rngToUse =
    currentDepth < STRUCTURE_RNG_DEPTH ? structureRng : channelRng;

  // Decide category with a single RNG draw, then filter — avoids consuming
  // one RNG value per structural rule (which made the sequence order-sensitive).
  const structuralProbability = 1 - currentDepth / maxDepth;
  const useStructural = rngToUse.next() < structuralProbability;

  const preferred = availableRules.filter((r) =>
    useStructural ? r.category === 'structural' : r.category === 'terminal'
  );
  const pool =
    preferred.length > 0
      ? preferred
      : availableRules.filter((r) => r.category === 'terminal');

  const idx = weightedPick(rngToUse, pool);

  return pool[idx].buildNode(rngToUse, () =>
    buildTree(structureRng, channelRng, currentDepth + 1, maxDepth, rules)
  );
}

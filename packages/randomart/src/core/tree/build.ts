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

  const pool =
    currentDepth >= maxDepth
      ? availableRules.filter((r) => r.arity === 0)
      : availableRules;

  if (pool.length === 0) {
    return { ruleId: 'x', args: [] };
  }

  const idx = weightedPick(rng, pool);

  return pool[idx].buildNode(rng, () => {
    return buildTree(rng, currentDepth + 1, maxDepth, rules);
  });
}

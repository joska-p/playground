import { getAllRules, getRule } from './grammar/registry';
import type { GrammarRule } from './grammar/types';
import type { SeededRandom } from './SeededRandom';
import type { ExpressionNode } from './types';

function weightedPick(rng: SeededRandom, rules: GrammarRule[]): number {
  const totalWeight = rules.reduce((sum, r) => sum + r.weight, 0);
  let threshold = rng.next() * totalWeight;
  for (let i = 0; i < rules.length; i++) {
    threshold -= rules[i].weight;
    if (threshold <= 0) return i;
  }
  return rules.length - 1;
}

export function evaluateNode(
  node: ExpressionNode,
  x: number,
  y: number,
  t: number = 0
): number {
  const rule = getRule(node.ruleId);
  if (!rule) return 0;

  if (node.ruleId === 'x') return x;
  if (node.ruleId === 'y') return y;
  if (node.ruleId === 't') return t;

  const lazyArgs = node.args.map((child) => {
    return () => evaluateNode(child, x, y, t);
  });

  if (rule.id === 'constant' && node.constantValue !== undefined) {
    return node.constantValue;
  }

  return rule.evaluate(lazyArgs, x, y, t);
}

export function buildTree(
  rng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  rules?: GrammarRule[]
): ExpressionNode {
  const availableRules = rules ?? getAllRules();

  const pool = currentDepth >= maxDepth
    ? availableRules.filter((r) => r.arity === 0)
    : availableRules;

  if (pool.length === 0) {
    return { ruleId: 'x', args: [] };
  }

  const idx = weightedPick(rng, pool);
  return pool[idx].buildNode(rng, () =>
    buildTree(rng, currentDepth + 1, maxDepth, rules)
  );
}

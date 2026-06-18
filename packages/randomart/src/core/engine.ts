import { getAllRules, getRule } from './grammar/registry';
import type { GrammarRule } from './grammar/types';
import type { SeededRandom } from './SeededRandom';
import type { ExpressionNode } from './types';

export function evaluateNode(
  node: ExpressionNode,
  x: number,
  y: number
): number {
  const rule = getRule(node.ruleId);
  if (!rule) return 0;

  if (node.ruleId === 'x') return x;
  if (node.ruleId === 'y') return y;

  const lazyArgs = node.args.map((child) => {
    return () => evaluateNode(child, x, y);
  });

  if (rule.id === 'constant' && node.constantValue !== undefined) {
    return node.constantValue;
  }

  return rule.evaluate(lazyArgs, x, y);
}

export function buildTree(
  rng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  rules?: GrammarRule[]
): ExpressionNode {
  const availableRules = rules ?? getAllRules();
  const terminals = availableRules.filter((r) => r.arity === 0);
  const operators = availableRules.filter((r) => r.arity > 0);

  if (currentDepth >= maxDepth || terminals.length === 0) {
    const idx = Math.floor(rng.next() * terminals.length);
    return terminals[idx].buildNode(rng, () =>
      buildTree(rng, currentDepth + 1, maxDepth, rules)
    );
  }

  const shouldBeTerminal = rng.next() < 0.15;
  const pool = shouldBeTerminal ? terminals : operators;

  if (pool.length === 0) {
    const idx = Math.floor(rng.next() * terminals.length);
    return terminals[idx].buildNode(rng, () =>
      buildTree(rng, currentDepth + 1, maxDepth, rules)
    );
  }

  const idx = Math.floor(rng.next() * pool.length);
  return pool[idx].buildNode(rng, () =>
    buildTree(rng, currentDepth + 1, maxDepth, rules)
  );
}

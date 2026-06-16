import { SeededRandom } from './SeededRandom';
import { getAllRules, getRule } from './grammar/registry';
import type { ExpressionNode } from './types';

export function evaluateNode(
  node: ExpressionNode,
  x: number,
  y: number
): number {
  const rule = getRule(node.ruleId);
  if (!rule) return 0;

  const args = node.args.map((child) => {
    if (child.ruleId === 'x') return x;
    if (child.ruleId === 'y') return y;
    return evaluateNode(child, x, y);
  });

  if (rule.id === 'constant' && node.constantValue !== undefined) {
    args[0] = node.constantValue;
  }

  return rule.evaluate(args, x, y);
}

export function buildTree(
  rng: SeededRandom,
  currentDepth: number,
  maxDepth: number
): ExpressionNode {
  const rules = getAllRules();
  const terminals = rules.filter((r) => r.arity === 0);
  const operators = rules.filter((r) => r.arity > 0);

  if (currentDepth >= maxDepth || terminals.length === 0) {
    const idx = Math.floor(rng.next() * terminals.length);
    return terminals[idx].buildNode(rng, () =>
      buildTree(rng, currentDepth + 1, maxDepth)
    );
  }

  const shouldBeTerminal = rng.next() < 0.15;
  const pool = shouldBeTerminal ? terminals : operators;

  if (pool.length === 0) {
    const idx = Math.floor(rng.next() * terminals.length);
    return terminals[idx].buildNode(rng, () =>
      buildTree(rng, currentDepth + 1, maxDepth)
    );
  }

  const idx = Math.floor(rng.next() * pool.length);
  return pool[idx].buildNode(rng, () =>
    buildTree(rng, currentDepth + 1, maxDepth)
  );
}

export function generateTrees(
  seedText: string,
  maxDepth: number
): {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  rngR: SeededRandom;
  rngG: SeededRandom;
  rngB: SeededRandom;
} {
  const rngR = new SeededRandom(seedText + '_red');
  const rngG = new SeededRandom(seedText + '_green');
  const rngB = new SeededRandom(seedText + '_blue');

  const treeR = buildTree(rngR, 0, maxDepth);
  const treeG = buildTree(rngG, 0, maxDepth);
  const treeB = buildTree(rngB, 0, maxDepth);

  return { treeR, treeG, treeB, rngR, rngG, rngB };
}

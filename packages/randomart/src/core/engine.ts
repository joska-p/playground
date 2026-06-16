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

  // Create standard shortcuts for x and y leaf nodes
  if (node.ruleId === 'x') return x;
  if (node.ruleId === 'y') return y;

  // Turn child nodes into executable triggers instead of numbers
  const lazyArgs = node.args.map((child) => {
    return () => evaluateNode(child, x, y);
  });

  // Handle constants directly by passing a wrapper function
  if (rule.id === 'constant' && node.constantValue !== undefined) {
    return node.constantValue;
  }

  return rule.evaluate(lazyArgs, x, y);
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

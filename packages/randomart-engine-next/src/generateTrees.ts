/**
 * Multi-channel tree generation with correlated / uncorrelated RGB modes.
 *
 * This is the entry point for the UI's three-channel rendering pipeline.
 * It wraps the dual-RNG machinery from `prng.ts` and the `buildExpressionTree`
 * function from `expression.ts` into a single call that returns R/G/B expression trees.
 *
 * - **Correlated mode**: all three channels share one RNG so structural decisions
 *   are identical — channels diverge only because trees are built as separate
 *   instances.
 * - **Uncorrelated mode**: a structure RNG (shared at shallow depths via
 *   `STRUCTURE_RNG_DEPTH`) plus three independent per-channel RNGs produce
 *   images with coherent broad structure but per-channel color variation.
 */

import { buildExpressionTree } from './expression.js';
import type { GrammarSpec } from './grammar/rules/registry.js';
import { createCorrelatedRng, createDualRng } from './prng.js';
import type { ExprNode } from './types.js';

export type GenerateTreesConfig = {
  seedText: string;
  spec: GrammarSpec;
  correlated: boolean;
};

export type GenerateTreesOutput = {
  treeR: ExprNode;
  treeG: ExprNode;
  treeB: ExprNode;
};

export function generateTrees(config: GenerateTreesConfig): GenerateTreesOutput {
  const { seedText, spec, correlated } = config;

  if (correlated) {
    const { structure, channels } = createCorrelatedRng(seedText);
    return {
      treeR: buildExpressionTree(structure, channels[0], 0, spec.maxDepth, spec),
      treeG: buildExpressionTree(structure, channels[1], 0, spec.maxDepth, spec),
      treeB: buildExpressionTree(structure, channels[2], 0, spec.maxDepth, spec)
    };
  }

  const { structure, channels } = createDualRng(seedText, spec.maxDepth);
  return {
    treeR: buildExpressionTree(structure, channels[0], 0, spec.maxDepth, spec),
    treeG: buildExpressionTree(structure, channels[1], 0, spec.maxDepth, spec),
    treeB: buildExpressionTree(structure, channels[2], 0, spec.maxDepth, spec)
  };
}

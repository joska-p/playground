/**
 * Factory function that creates a {@link GrammarRule} from a
 * {@link GrammarSpec}. Handles per-seed memoization of the built node
 * so every representation is derived from the exact same tree.
 */

import { compileToGLSL } from '../../compileToGLSL.js';
import { grow, toBytes, toStructuredView } from '../../expression.js';
import { toMathString as nodeToMathString } from '../../format.js';
import { SeededRandom } from '../../prng.js';
import type { ExprNode } from '../../types.js';
import type { GrammarRule, GrammarSpec } from './registry.js';

export function createRule(spec: GrammarSpec): GrammarRule {
  const cache = new Map<string, ExprNode>();

  const build = (textSeed: string): ExprNode => {
    if (!textSeed || textSeed.length === 0) {
      throw new Error('textSeed must be a non-empty string.');
    }
    const cached = cache.get(textSeed);
    if (cached) return cached;
    const rng = new SeededRandom(`${spec.id}:${textSeed}`);
    const node = grow(rng, spec, spec.maxDepth);
    cache.set(textSeed, node);
    return node;
  };

  return {
    ...spec,
    buildNode: (textSeed: string): ExprNode => build(textSeed),
    toCPU: (textSeed: string): Uint8Array => toBytes(build(textSeed)),
    toGPU: (textSeed: string): string => {
      const node = build(textSeed);
      return compileToGLSL(node, node, node, []);
    },
    toMathString: (textSeed: string): string => nodeToMathString(build(textSeed)),
    toTreeView: (textSeed: string) => toStructuredView(build(textSeed))
  };
}

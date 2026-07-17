/**
 * Composite rule definitions that mix multiple operator categories.
 *
 * The `smooth` rule has been removed (relied on `well` + `mix`).
 * The `flow-art` rule has been updated: `smoothstep` replaced with `product`.
 * The `compare-and-clamp` rule has been updated: `clamp` replaced with `if`.
 */

import { createRule } from './createRule.js';

export const flowArtRule = createRule({
  id: 'flow-art',
  displayName: 'Flow Art',
  category: 'composite',
  operators: ['if', 'product', 'sum', 'sin'],
  minDepth: 4,
  maxDepth: 10
});

export const compareAndClampRule = createRule({
  id: 'compare-and-clamp',
  displayName: 'Compare and Clamp',
  category: 'composite',
  operators: ['if', 'less-than', 'greater-than', 'step', 'sum', 'product'],
  minDepth: 4,
  maxDepth: 10
});

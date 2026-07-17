/**
 * Combinator-only rule definitions — one rule per binary/ternary combinator.
 *
 * The `smoothstep` and `clamp` combinator rules have been removed as those
 * operators were composite and have been dropped from the grammar.
 */

import { createRule } from './createRule.js';

export const combinatorSumRule = createRule({
  id: 'combinator-sum',
  displayName: 'Combinator: sum',
  category: 'combinator',
  operators: ['sum'],
  minDepth: 3,
  maxDepth: 8
});

export const combinatorProductRule = createRule({
  id: 'combinator-product',
  displayName: 'Combinator: product',
  category: 'combinator',
  operators: ['product'],
  minDepth: 3,
  maxDepth: 8
});

export const combinatorModRule = createRule({
  id: 'combinator-mod',
  displayName: 'Combinator: mod',
  category: 'combinator',
  operators: ['mod'],
  minDepth: 3,
  maxDepth: 8
});

export const combinatorPowRule = createRule({
  id: 'combinator-pow',
  displayName: 'Combinator: pow',
  category: 'combinator',
  operators: ['pow'],
  minDepth: 3,
  maxDepth: 8
});

export const combinatorLessThanRule = createRule({
  id: 'combinator-less-than',
  displayName: 'Combinator: less-than',
  category: 'combinator',
  operators: ['less-than'],
  minDepth: 3,
  maxDepth: 8
});

export const combinatorGreaterThanRule = createRule({
  id: 'combinator-greater-than',
  displayName: 'Combinator: greater-than',
  category: 'combinator',
  operators: ['greater-than'],
  minDepth: 3,
  maxDepth: 8
});

export const combinatorStepRule = createRule({
  id: 'combinator-step',
  displayName: 'Combinator: step',
  category: 'combinator',
  operators: ['step'],
  minDepth: 3,
  maxDepth: 8
});

export const combinatorIfRule = createRule({
  id: 'combinator-if',
  displayName: 'Combinator: if',
  category: 'combinator',
  operators: ['if'],
  minDepth: 3,
  maxDepth: 8
});

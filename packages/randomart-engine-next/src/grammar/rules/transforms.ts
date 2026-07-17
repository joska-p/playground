/**
 * Transform-only rule definitions — one rule per unary transform operator.
 */

import { createRule } from './createRule.js';

export const transformSinRule = createRule({
  id: 'transform-sin',
  displayName: 'Transform: sin',
  category: 'transform',
  operators: ['sin'],
  minDepth: 3,
  maxDepth: 8
});

export const transformCosRule = createRule({
  id: 'transform-cos',
  displayName: 'Transform: cos',
  category: 'transform',
  operators: ['cos'],
  minDepth: 3,
  maxDepth: 8
});

export const transformAbsRule = createRule({
  id: 'transform-abs',
  displayName: 'Transform: abs',
  category: 'transform',
  operators: ['abs'],
  minDepth: 3,
  maxDepth: 8
});

export const transformSqrtRule = createRule({
  id: 'transform-sqrt',
  displayName: 'Transform: sqrt',
  category: 'transform',
  operators: ['sqrt'],
  minDepth: 3,
  maxDepth: 8
});

export const transformExpRule = createRule({
  id: 'transform-exp',
  displayName: 'Transform: exp',
  category: 'transform',
  operators: ['exp'],
  minDepth: 3,
  maxDepth: 8
});

export const transformLogRule = createRule({
  id: 'transform-log',
  displayName: 'Transform: log',
  category: 'transform',
  operators: ['log'],
  minDepth: 3,
  maxDepth: 8
});

export const transformFractRule = createRule({
  id: 'transform-fract',
  displayName: 'Transform: fract',
  category: 'transform',
  operators: ['fract'],
  minDepth: 3,
  maxDepth: 8
});

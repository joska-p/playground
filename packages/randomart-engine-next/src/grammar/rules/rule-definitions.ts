/**
 * Grammar rule definitions.
 *
 * - `classic`: Paper's basic grammar (add, mult, sin, cos)
 * - `paper`: Paper's extended set (sin, cos, exp, sqrt, div, mix)
 * - `flow`: Conditional/blending focused
 * - `fat`: All operators
 */

import type { OperatorId } from '../operators/registry.js';
import { OPERATORS } from '../operators/registry.js';
import { createRule } from './createRule.js';

const allOperatorIds = Object.keys(OPERATORS) as OperatorId[];

export const classicRule = createRule({
  id: 'classic',
  displayName: 'Classic',
  category: 'classic',
  operators: ['sum', 'product', 'sin', 'cos'],
  minDepth: 4,
  maxDepth: 12
});

export const paperRule = createRule({
  id: 'paper',
  displayName: 'Paper',
  category: 'classic',
  operators: ['sum', 'product', 'sin', 'cos', 'exp', 'sqrt', 'div', 'mix'],
  minDepth: 4,
  maxDepth: 12
});

export const flowRule = createRule({
  id: 'flow',
  displayName: 'Flow',
  category: 'classic',
  operators: ['if', 'less-than', 'greater-than', 'step', 'mix', 'sum', 'product'],
  minDepth: 4,
  maxDepth: 10
});

export const fatRule = createRule({
  id: 'fat',
  displayName: 'All Operators',
  category: 'classic',
  operators: allOperatorIds,
  minDepth: 4,
  maxDepth: 11
});

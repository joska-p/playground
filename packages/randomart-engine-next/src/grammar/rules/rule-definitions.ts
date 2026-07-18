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

const allOperatorIds = Object.keys(OPERATORS) as OperatorId[];

export const classicRule = {
  id: 'classic',
  displayName: 'Classic',
  category: 'classic' as const,
  operators: ['sum', 'product', 'sin', 'cos'] as OperatorId[],
  minDepth: 4,
  maxDepth: 12
};

export const paperRule = {
  id: 'paper',
  displayName: 'Paper',
  category: 'classic' as const,
  operators: ['sum', 'product', 'sin', 'cos', 'exp', 'sqrt', 'div', 'mix'] as OperatorId[],
  minDepth: 4,
  maxDepth: 12
};

export const flowRule = {
  id: 'flow',
  displayName: 'Flow',
  category: 'classic' as const,
  operators: ['if', 'less-than', 'greater-than', 'step', 'mix', 'sum', 'product'] as OperatorId[],
  minDepth: 4,
  maxDepth: 10
};

export const fatRule = {
  id: 'fat',
  displayName: 'All Operators',
  category: 'classic' as const,
  operators: allOperatorIds,
  minDepth: 4,
  maxDepth: 11
};

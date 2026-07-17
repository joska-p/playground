/**
 * Composite rule definitions — classic, trig, blocky, arithmetic-mix.
 *
 * These are multi-operator grammar rules that produce visually distinct
 * art families. Rules that previously used composite operators (`well`,
 * `mix`, `tent`, `smoothstep`, `clamp`) have been reworked to use only
 * the 24 primitive operators.
 */

import type { OperatorId } from '../operators/registry.js';
import { OPERATORS } from '../operators/registry.js';
import { createRule } from './createRule.js';

const allOperatorIds = Object.keys(OPERATORS) as OperatorId[];

export const fatRule = createRule({
  id: 'fat',
  displayName: 'All op enabled',
  category: 'classic',
  operators: allOperatorIds,
  minDepth: 4,
  maxDepth: 11
});

export const classicRule = createRule({
  id: 'classic',
  displayName: 'Classic Random Art',
  category: 'classic',
  operators: ['sum', 'product', 'sin', 'cos', 'abs', 'if', 'div'],
  minDepth: 4,
  maxDepth: 11
});

export const trigRule = createRule({
  id: 'trig',
  displayName: 'Trigonometric Waves',
  category: 'classic',
  operators: ['sin', 'cos', 'sum', 'product'],
  minDepth: 4,
  maxDepth: 10
});

export const blockyRule = createRule({
  id: 'blocky',
  displayName: 'Blocky Modular',
  category: 'classic',
  operators: ['mod', 'abs', 'sqrt', 'product', 'sum'],
  minDepth: 3,
  maxDepth: 8
});

export const arithmeticMixRule = createRule({
  id: 'arithmetic-mix',
  displayName: 'Arithmetic Mix',
  category: 'classic',
  operators: ['sum', 'product', 'pow', 'mod', 'sin', 'abs'],
  minDepth: 4,
  maxDepth: 10
});

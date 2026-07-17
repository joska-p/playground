/**
 * Composite rule definitions — classic, trig, blocky, arithmetic-mix.
 *
 * These are multi-operator grammar rules that produce visually distinct
 * art families. Rules that previously used composite operators (`well`,
 * `mix`, `tent`, `smoothstep`, `clamp`) have been reworked to use only
 * the 24 primitive operators.
 */

import { createRule } from './createRule.js';

export const classicRule = createRule({
  id: 'classic',
  displayName: 'Classic Random Art',
  operators: ['sum', 'product', 'sin', 'cos', 'abs', 'if'],
  minDepth: 4,
  maxDepth: 11
});

export const trigRule = createRule({
  id: 'trig',
  displayName: 'Trigonometric Waves',
  operators: ['sin', 'cos', 'sum', 'product'],
  minDepth: 4,
  maxDepth: 10
});

export const blockyRule = createRule({
  id: 'blocky',
  displayName: 'Blocky Modular',
  operators: ['mod', 'abs', 'sqrt', 'product', 'sum'],
  minDepth: 3,
  maxDepth: 8
});

export const arithmeticMixRule = createRule({
  id: 'arithmetic-mix',
  displayName: 'Arithmetic Mix',
  operators: ['sum', 'product', 'pow', 'mod', 'sin', 'abs'],
  minDepth: 4,
  maxDepth: 10
});

/**
 * Operator registry — single source of truth for all grammar operators.
 *
 * The `OPERATORS` record maps every `ExprNodeType` to its self-contained
 * implementation object. Types are inferred from the record; completeness
 * is checked at compile time against the `ExprNodeType` union.
 */

import type { ExprNodeType } from '../../types.js';
import { modOp, powOp, productOp, sumOp } from './combinators/arithmetic.js';
import { greaterThanOp, lessThanOp, stepOp } from './combinators/comparison.js';
import { ifOp } from './combinators/flow.js';
import { xOp, yOp } from './inputs/coordinate.js';
import {
  fbmOp,
  nestedOscillationOp,
  radialOp,
  recamanPatternOp,
  sweepOp
} from './inputs/derived.js';
import { constOp, randomOp } from './inputs/values.js';
import { absOp, expOp, fractOp, logOp, sqrtOp } from './transforms/math.js';
import { cosOp, sinOp } from './transforms/trigonometric.js';

// ── Registry ────────────────────────────────────────────────────

export const OPERATORS = {
  x: xOp,
  y: yOp,
  const: constOp,
  random: randomOp,
  radial: radialOp,
  sweep: sweepOp,
  fbm: fbmOp,
  'recaman-pattern': recamanPatternOp,
  'nested-oscillation': nestedOscillationOp,
  sin: sinOp,
  cos: cosOp,
  abs: absOp,
  sqrt: sqrtOp,
  exp: expOp,
  log: logOp,
  fract: fractOp,
  sum: sumOp,
  product: productOp,
  mod: modOp,
  pow: powOp,
  'less-than': lessThanOp,
  'greater-than': greaterThanOp,
  step: stepOp,
  if: ifOp
} satisfies Record<ExprNodeType, unknown>;

// ── Type inference ──────────────────────────────────────────────

type InferredOps = typeof OPERATORS;

/** Every value in OPERATORS must satisfy this shape. */
export type OperatorDef = InferredOps[keyof InferredOps];

/** The union of all operator keys — replaces ExprNodeType. */
export type OperatorId = keyof InferredOps;

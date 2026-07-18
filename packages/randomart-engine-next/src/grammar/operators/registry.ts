/**
 * Operator registry — single source of truth for all grammar operators.
 *
 * `OperatorDef` is the concrete shape every operator must satisfy.
 * `OPERATORS` maps each operator id to its implementation; `OperatorId` and
 * the `getOperator()` helper are inferred from this record so there is
 * exactly one place to update when adding or removing an operator.
 */

import { divOp, modOp, powOp, productOp, sumOp } from './combinators/arithmetic.js';
import { greaterThanOp, lessThanOp, stepOp } from './combinators/comparison.js';
import { ifOp, mixOp } from './combinators/flow.js';
import { xOp, yOp } from './terminals/coordinate.js';
import {
  fbmOp,
  nestedOscillationOp,
  radialOp,
  recamanPatternOp,
  sweepOp
} from './terminals/derived.js';
import { constOp, randomOp } from './terminals/values.js';
import { absOp, expOp, fractOp, logOp, sqrtOp } from './transforms/math.js';
import { cosOp, sinOp } from './transforms/trigonometric.js';

// ── Operator definition shape ───────────────────────────────────

/**
 * Concrete interface every operator satisfies. Uses **method syntax**
 * so that TypeScript's bivariant parameter checking allows operators
 * with narrower destructured params (e.g. `{ a, b }`) to satisfy the
 * wider `Record<string, T>` signatures below — no `as never` needed
 * at call sites.
 */
export type OperatorCategory = 'terminal' | 'transform' | 'combinator';

export type Operator = {
  readonly arity: number;
  readonly opcode: number;
  readonly category: OperatorCategory;
  readonly label: string;
  readonly argNames: readonly string[];
  evaluate(args: Record<string, number>, x: number, y: number): number;
  toGLSL(args: Record<string, string>): string;
  toMathString(args: Record<string, string>): string;
  readonly noiseDependencies?: readonly string[];
};

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
  div: divOp,
  'less-than': lessThanOp,
  'greater-than': greaterThanOp,
  step: stepOp,
  if: ifOp,
  mix: mixOp
} satisfies Record<string, Operator>;

// ── Inferred types ──────────────────────────────────────────────

/** The union of all operator keys — the single source of truth for ExprNodeType. */
export type OperatorId = keyof typeof OPERATORS;

// ── Runtime helpers ─────────────────────────────────────────────

/**
 * Look up an operator by id, widening to the concrete {@link Operator}
 * interface so callers can invoke methods without `as never` casts.
 */
export function getOperator(id: OperatorId): Operator {
  return OPERATORS[id];
}

// ── Category grouping ───────────────────────────────────────────

const CATEGORY_ORDER: OperatorCategory[] = ['terminal', 'transform', 'combinator'];

const CATEGORY_LABELS: Record<OperatorCategory, string> = {
  terminal: 'Terminals',
  transform: 'Transforms',
  combinator: 'Combinators'
};

export type OperatorGroup = {
  label: string;
  operators: { id: OperatorId; label: string }[];
};

/**
 * Group all registered operators by their {@link Operator.category}.
 * The order is deterministic: Terminals → Transforms → Combinators.
 */
export function getOperatorCategories(): OperatorGroup[] {
  const grouped = new Map<OperatorCategory, { id: OperatorId; label: string }[]>();

  for (const cat of CATEGORY_ORDER) {
    grouped.set(cat, []);
  }

  for (const [id, op] of Object.entries(OPERATORS) as [OperatorId, Operator][]) {
    grouped.get(op.category)!.push({ id, label: op.label });
  }

  return CATEGORY_ORDER.map((cat) => ({
    label: CATEGORY_LABELS[cat],
    operators: grouped.get(cat)!
  }));
}

import type { GlslFunctionsIds } from '../../glsl-library.js';
import { divOp, modOp, powOp, productOp, sumOp } from './combinators/arithmetic.js';
import { greaterThanOp, lessThanOp } from './combinators/comparison.js';
import { ifOp, mixOp } from './combinators/flow.js';
import { xOp, yOp } from './terminals/coordinate.js';
import { radialOp, sweepOp } from './terminals/derived.js';
import { constOp, randomOp } from './terminals/values.js';
import { absOp, expOp, fractOp, logOp, sqrtOp } from './transforms/math.js';
import { cosOp, sinOp } from './transforms/trigonometric.js';

export type OperatorKind = 'terminal' | 'transform' | 'combinator';

export type Operator = {
  readonly arity: number;
  readonly opcode: number;
  readonly kind: OperatorKind;
  readonly label: string;
  readonly argNames: readonly string[];
  evaluate(args: Record<string, number>, x: number, y: number): number;
  toGLSL(args: Record<string, string>): string;
  toMathString(args: Record<string, string>): string;
  readonly noiseDependencies?: readonly GlslFunctionsIds[];
};

export const OPERATORS = {
  x: xOp,
  y: yOp,
  const: constOp,
  random: randomOp,
  radial: radialOp,
  sweep: sweepOp,
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
  if: ifOp,
  mix: mixOp
} satisfies Record<string, Operator>;

export type OperatorId = keyof typeof OPERATORS;

export function getOperator(id: OperatorId): Operator {
  return OPERATORS[id];
}

const KIND_ORDER: OperatorKind[] = ['terminal', 'transform', 'combinator'];

const KIND_LABELS: Record<OperatorKind, string> = {
  terminal: 'Terminals',
  transform: 'Transforms',
  combinator: 'Combinators'
};

export type OperatorGroup = {
  label: string;
  operators: { id: OperatorId; label: string }[];
};

export function getOperatorKinds(): OperatorGroup[] {
  const grouped = new Map<OperatorKind, { id: OperatorId; label: string }[]>();

  for (const cat of KIND_ORDER) {
    grouped.set(cat, []);
  }

  for (const [id, op] of Object.entries(OPERATORS) as [OperatorId, Operator][]) {
    grouped.get(op.kind)!.push({ id, label: op.label });
  }

  return KIND_ORDER.map((cat) => ({
    label: KIND_LABELS[cat],
    operators: grouped.get(cat)!
  }));
}

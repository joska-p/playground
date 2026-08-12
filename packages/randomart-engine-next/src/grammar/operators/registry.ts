import type { GlslFunctionsIds } from '../../glsl-library.js';
import {
    divOp,
    greaterThanOp,
    ifOp,
    lessThanOp,
    mixOp,
    modOp,
    powOp,
    productOp,
    sumOp
} from './combinators.js';
import { constOp, radialOp, randomOp, sweepOp, xOp, yOp } from './terminals.js';
import {
    absOp,
    cosOp,
    expOp,
    fractOp,
    logOp,
    oscOp,
    shiftOp,
    sinOp,
    sqrtOp
} from './transforms.js';

/** The category an operator falls into: leaf, unary transform, or n-ary combinator. */
export type OperatorKind = 'terminal' | 'transform' | 'combinator';

/** The evaluation context passed to an operator's `evaluate` — pixel coord and time. */
export type EvalContext = {
    x: number;
    y: number;
    t: number;
};

/**
 * The contract every grammar operator implements — knows its arity, how to
 * evaluate, and how to render itself to GLSL and math notation.
 */
export type Operator<TArgNames extends readonly string[] = readonly string[]> = {
    readonly arity: number;
    readonly kind: OperatorKind;
    readonly label: string;
    readonly argNames: TArgNames;
    evaluate(params: { args: Record<TArgNames[number], number>; ctx: EvalContext }): number;
    toGLSL(params: { args: Record<TArgNames[number], string>; coordVar: string }): string;
    toMathString(params: { args: Record<TArgNames[number], string> }): string;

    readonly noiseDependencies?: readonly GlslFunctionsIds[];
};

/** The built-in operator registry, keyed by operator id. */
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
    mix: mixOp,
    osc: oscOp,
    shift: shiftOp
} satisfies Record<string, Operator>;

/** Union of the ids of every built-in operator. */
export type OperatorId = keyof typeof OPERATORS;

/** Look up an operator definition by id. */
export function getOperator(id: OperatorId): Operator {
    return OPERATORS[id];
}

const KIND_ORDER: OperatorKind[] = ['terminal', 'transform', 'combinator'];

const KIND_LABELS: Record<OperatorKind, string> = {
    terminal: 'Terminals',
    transform: 'Transforms',
    combinator: 'Combinators'
};

/** One category of operators (e.g. Terminals) with its members, for pickers. */
export type OperatorGroup = {
    label: string;
    operators: { id: OperatorId; label: string }[];
};

/** All operators grouped by {@link OperatorKind}, for building pickers. */
export function getOperatorKinds(): OperatorGroup[] {
    const grouped = new Map<OperatorKind, { id: OperatorId; label: string }[]>();

    for (const kind of KIND_ORDER) {
        grouped.set(kind, []);
    }

    for (const [id, op] of Object.entries(OPERATORS) as [OperatorId, Operator][]) {
        grouped.get(op.kind)!.push({ id, label: op.label });
    }

    return KIND_ORDER.map((cat) => ({
        label: KIND_LABELS[cat],
        operators: grouped.get(cat)!
    }));
}

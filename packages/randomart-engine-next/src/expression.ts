/**
 * Expression-tree construction, evaluation, and rendering.
 *
 * This is the heart of the random-art scheme. Following Perrig & Song, we grow a
 * random expression from a context-free grammar. The grammar's terminals are the
 * coordinates `x`, `y`, and random constants; its non-terminals are arithmetic
 * and trigonometric combinators. Growth is bounded by a maximum depth so the
 * tree stays finite. The resulting node is a pure function f(x, y) -> [-1, 1].
 *
 * The same node is rendered four ways:
 *  - evaluate()      numeric evaluation for CPU rasterization
 *  - toGLSL()        a GPU fragment-shader expression
 *  - toMathString()  a readable mathematical formula
 *  - toTreeView()    a nested, serializable structure
 */

import type { OperatorId } from './grammar/operators/registry.js';
import { OPERATORS } from './grammar/operators/registry.js';
import type { GrammarSpec } from './grammar/types.js';
import type { SeededRandom } from './prng.js';
import type { ExprNode, TreeView } from './types.js';

const clamp = (v: number): number => (v < -1 ? -1 : v > 1 ? 1 : v);

// ── Pool building for grow() / buildTree() ──────────────────────

/**
 * Depth below which the shared structureRng drives category selection,
 * keeping the overall tree shape consistent across R/G/B channels.
 */
const STRUCTURE_RNG_DEPTH = 3;

type PoolEntry = {
  type: ExprNode['type'];
  arity: number;
  weight: number;
};

const DEFAULT_TERMINALS: readonly PoolEntry[] = [
  { type: 'x', arity: 0, weight: 1.0 },
  { type: 'y', arity: 0, weight: 1.0 },
  { type: 'const', arity: 0, weight: 0.5 }
];

const toEntry = (id: OperatorId): PoolEntry => ({
  type: id,
  arity: OPERATORS[id].arity,
  weight: id === 'const' ? 0.5 : 1.0
});

/**
 * Builds the candidate pool by rolling each structural rule independently
 * against structuralProbability. Each rule gets its own RNG draw, so different
 * seeds produce pools of different sizes — this per-rule variance is what drives
 * tree variety. Terminals are always included as a guaranteed fallback.
 */
function buildPool(
  rng: SeededRandom,
  operators: readonly PoolEntry[],
  structuralProbability: number
): PoolEntry[] {
  const pool: PoolEntry[] = [];
  for (const op of operators) {
    if (op.arity === 0 || rng.next() < structuralProbability) {
      pool.push(op);
    }
  }
  return pool.length > 0 ? pool : [...DEFAULT_TERMINALS];
}

function weightedPick(rng: SeededRandom, pool: readonly PoolEntry[]): PoolEntry {
  if (pool.length === 0) return DEFAULT_TERMINALS[0]!;
  const totalWeight = pool.reduce((sum, op) => sum + op.weight, 0);
  let threshold = rng.next() * totalWeight;
  for (const op of pool) {
    threshold -= op.weight;
    if (threshold <= 0) return op;
  }
  return pool[pool.length - 1]!;
}

// ── Tree growth ─────────────────────────────────────────────────

/**
 * Recursively grow an expression node.
 *
 * Uses depth-dependent structuralProbability: at the root all structural rules
 * are candidates, near the leaves only terminals survive — matching the engine's
 * pool-builder approach instead of a fixed coin-flip.
 *
 * @param rng    Seeded random stream (advances as the tree grows).
 * @param spec   Grammar variant controlling operators and growth.
 * @param depth  Remaining depth budget (counts down toward the leaves).
 */
export function grow(rng: SeededRandom, spec: GrammarSpec, depth: number): ExprNode {
  const currentDepth = spec.maxDepth - depth;
  const forceTerminal = depth <= 0;
  const forceOperator = currentDepth < spec.minDepth;

  const specEntries = spec.operators.map(toEntry);
  const hasTerminals = specEntries.some((e) => e.arity === 0);
  const operators = hasTerminals ? specEntries : [...specEntries, ...DEFAULT_TERMINALS];

  let pool: PoolEntry[];

  if (forceTerminal) {
    pool = operators.filter((op) => op.arity === 0);
    if (pool.length === 0) pool = [...DEFAULT_TERMINALS];
  } else if (forceOperator) {
    pool = operators.filter((op) => op.arity > 0);
    if (pool.length === 0) pool = [...operators];
  } else {
    const structuralProbability = 1 - currentDepth / spec.maxDepth;
    pool = buildPool(rng, operators, structuralProbability);
  }

  const pick = weightedPick(rng, pool);

  if (pick.type === 'const') {
    return { type: 'const', value: Number(rng.nextRange(-1, 1).toFixed(4)) };
  }

  if (pick.arity === 0) {
    return { type: pick.type };
  }

  const children: ExprNode[] = [];
  for (let i = 0; i < pick.arity; i++) {
    children.push(grow(rng, spec, depth - 1));
  }
  return { type: pick.type, children };
}

/**
 * Build a tree using dual-RNG separation for correlated-but-varied color channels.
 *
 * Below STRUCTURE_RNG_DEPTH the shared structureRng drives category selection,
 * keeping the overall tree shape consistent across R/G/B channels. Above that
 * threshold the per-channel channelRng takes over for per-channel variation.
 */
export function buildTree(
  structureRng: SeededRandom,
  channelRng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  spec: GrammarSpec
): ExprNode {
  const rngToUse = currentDepth < STRUCTURE_RNG_DEPTH ? structureRng : channelRng;

  const specEntries = spec.operators.map(toEntry);
  const hasTerminals = specEntries.some((e) => e.arity === 0);
  const operators = hasTerminals ? specEntries : [...specEntries, ...DEFAULT_TERMINALS];

  const structuralProbability = 1 - currentDepth / maxDepth;
  const pool = buildPool(rngToUse, operators, structuralProbability);
  const pick = weightedPick(rngToUse, pool);

  if (pick.type === 'const') {
    return { type: 'const', value: Number(rngToUse.nextRange(-1, 1).toFixed(4)) };
  }

  if (pick.arity === 0) {
    return { type: pick.type };
  }

  const children: ExprNode[] = [];
  for (let i = 0; i < pick.arity; i++) {
    children.push(buildTree(structureRng, channelRng, currentDepth + 1, maxDepth, spec));
  }
  return { type: pick.type, children };
}

// ── Registry-based walkers ──────────────────────────────────────

/** Evaluate a node at normalized coordinates x, y (each in [-1, 1]). */
export function evaluate(node: ExprNode, x: number, y: number): number {
  const op = OPERATORS[node.type];

  if (node.type === 'x') return x;
  if (node.type === 'y') return y;
  if (node.type === 'const') return node.value ?? 0;
  if (op.arity === 0) return op.evaluate({} as never, x, y);

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, evaluate(node.children![i]!, x, y)])
  ) as Record<string, number>;
  return op.evaluate(args as never, x, y);
}

/** Render a node as a GLSL expression string (all values kept in [-1, 1]). */
export function toGLSL(node: ExprNode): string {
  const op = OPERATORS[node.type];

  if (node.type === 'x') return 'p.x';
  if (node.type === 'y') return 'p.y';
  if (node.type === 'const') return (node.value ?? 0).toFixed(4);
  if (op.arity === 0) return op.toGLSL({} as never);

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, toGLSL(node.children![i]!)])
  ) as Record<string, string>;
  return op.toGLSL(args as never);
}

/** Render an expression node as a human-readable math formula. */
export function toMathString(node: ExprNode): string {
  const op = OPERATORS[node.type];

  if (node.type === 'const') return String(node.value ?? 0);
  if (op.arity === 0) return op.toMathString({} as never);

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, toMathString(node.children![i]!)])
  ) as Record<string, string>;
  return op.toMathString(args as never);
}

/**
 * Serialize a node into a compact byte array (the CPU representation).
 *
 * Layout is a pre-order traversal: one opcode byte per node, and for `const`
 * nodes a following signed byte encoding the value quantized to [-1, 1].
 */
export function toBytes(node: ExprNode): Uint8Array {
  const out: number[] = [];
  const walk = (n: ExprNode): void => {
    out.push(OPERATORS[n.type].opcode);
    if (n.type === 'const') {
      const q = Math.round((clamp(n.value ?? 0) + 1) * 127.5);
      out.push(Math.max(0, Math.min(255, q)));
    }
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return Uint8Array.from(out);
}

/**
 * Build a structured, serializable tree view from an expression node.
 *
 * The ASCII-rendered version lives in `format.ts`; this function produces the
 * underlying data structure that both the structured API and the ASCII renderer
 * consume.
 */
export function toStructuredView(node: ExprNode): TreeView {
  const label = node.type === 'const' ? `const(${node.value ?? 0})` : node.type;
  const view: TreeView = { label, type: node.type };
  if (node.type === 'const') view.value = node.value ?? 0;
  if (node.children && node.children.length > 0) {
    view.children = node.children.map(toStructuredView);
  }
  return view;
}

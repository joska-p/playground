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
import { clamp } from './util.js';

// ── Pool building for grow() / buildTree() ──────────────────────

/**
 * The tree-growth algorithm uses two RNG streams: one for structure (which nodes
 * appear where) and one for per-channel detail. At shallow depths — the "skeleton"
 * of the tree — both streams share the structure RNG so the R/G/B channels get
 * the same branching shape. Beyond this threshold the per-channel RNG takes over,
 * letting each channel diverge. The result is images that share broad structure
 * across color channels but differ in fine detail, producing richer color mixing.
 */
const STRUCTURE_RNG_DEPTH = 3;

type PoolEntry = {
  type: ExprNode['type'];
  arity: number;
  weight: number;
};

/**
 * Guaranteed fallback terminals, injected by `grow`/`buildTree` when a grammar
 * spec omits them. Every tree needs leaves to terminate — without these, a
 * grammar that only defines structural operators (e.g. add, sin) would produce
 * infinite trees.
 *
 * `const` is weighted at 0.5 (half as likely as x/y) so random constants appear
 * in roughly a third of terminal picks, avoiding over-reliance on magic numbers
 * while still giving each image a unique color palette.
 */
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
 * Probabilistically filters which operators are available at a given depth.
 *
 * Assumes the input includes terminals (arity-0 entries) — callers guarantee
 * this by appending DEFAULT_TERMINALS when the spec omits them. Terminals always
 * pass the filter, so the output is never empty.
 *
 * The effect is a depth-dependent "temperature" for tree complexity:
 *  - Near the root (structuralProbability ≈ 0), most structural operators are
 *    filtered out, so the pool is small and the root stays simple.
 *  - Near the leaves (structuralProbability ≈ 1), almost everything survives,
 *    giving maximum variety at the bottom — but depth pressure forces terminals
 *    anyway, so this doesn't create overly deep trees.
 *
 * Each operator gets its own independent coin flip, so different random seeds
 * produce pools of different sizes. This per-rule variance is the primary driver
 * of tree variety across seeds — two seeds with the same operators can produce
 * very different pool compositions.
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
  return pool;
}

/**
 * Biased random selection from the pool. Assumes a non-empty pool — callers
 * guarantee this by ensuring terminals are always present.
 *
 * Higher weight means more likely to be picked, but every entry has a non-zero
 * chance. This is how `const` gets its reduced frequency: it has weight 0.5 vs
 * 1.0 for everything else. In a pool of [x, y, const, sin], const has ~17%
 * chance (0.5/3.0) while each other entry has ~33% (1.0/3.0). The effect is
 * that images lean toward coordinate-based and operator-based expression, with
 * constants sprinkled in for palette variation rather than dominating the tree.
 */
function weightedPick(rng: SeededRandom, pool: readonly PoolEntry[]): PoolEntry {
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
 * Recursively grow an expression node from the root down.
 *
 * The key design choice is the three-way pool strategy:
 *  1. forceOperator (depth < minDepth): only structural operators — guarantees
 *     the tree has a minimum level of complexity before it's allowed to terminate.
 *  2. forceTerminal (depth = 0): only terminals — enforces a hard depth limit
 *     so trees are always finite.
 *  3. Normal growth: probabilistic filtering via buildPool, where the
 *     structuralProbability rises from 0 (root) to 1 (leaves). This creates a
 *     natural gradient: complex branching near the root, simple leaves near the
 *     bottom. The effect is trees that are "top-heavy" — visually interesting
 *     large-scale structure with fine detail at the leaves.
 *
 * If the grammar spec has no terminals, DEFAULT_TERMINALS are appended here —
 * this is the single point where the fallback lives (buildPool and weightedPick
 * no longer guard against empty pools).
 *
 * @param rng    Seeded random stream — advances as the tree grows, so the
 *               entire tree shape is determined by this stream's state.
 * @param spec   Grammar variant controlling which operators are available and
 *               the depth bounds that shape tree complexity.
 * @param depth  Remaining depth budget — counts down toward 0 (the leaves).
 *               At 0, only terminals are allowed.
 */
export function grow(rng: SeededRandom, spec: GrammarSpec, depth: number): ExprNode {
  const currentDepth = spec.maxDepth - depth;
  const forceTerminal = depth <= 0;
  const forceOperator = currentDepth < spec.minDepth;

  const specEntries = [...spec.operators].sort().map(toEntry);
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
 * This is the entry point for generating the R/G/B expression trees. The
 * structural consistency comes from sharing the structureRng below
 * STRUCTURE_RNG_DEPTH: all three channels get the same branching decisions at
 * the top of the tree, so their overall shape is similar. Above that threshold
 * the per-channel channelRng takes over, letting each color channel diverge
 * independently.
 *
 * The visual effect: images that have a coherent structural identity (shared
 * branching pattern) but with per-channel variation that produces interesting
 * color mixing. Purely correlated generation (same RNG everywhere) looks flat;
 * purely uncorrelated generation looks noisy. This hybrid approach hits the
 * sweet spot.
 *
 * Unlike grow(), this function tracks currentDepth directly (incrementing up)
 * rather than counting down, which makes the dual-RNG switching logic clearer.
 */
export function buildTree(
  structureRng: SeededRandom,
  channelRng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  spec: GrammarSpec
): ExprNode {
  const rngToUse = currentDepth < STRUCTURE_RNG_DEPTH ? structureRng : channelRng;

  const specEntries = [...spec.operators].sort().map(toEntry);
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

/**
 * Evaluate a node at normalized coordinates x, y (each in [-1, 1]).
 *
 * This is the CPU rendering path — it walks the tree and computes a numeric
 * output for each pixel. The returned value is always in [-1, 1], which gets
 * mapped to a color in the rendering pipeline. The tree structure means each
 * pixel evaluation is O(tree size), which is why CPU rendering is slower than
 * the GPU path (toGLSL).
 */
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

/**
 * Render a node as a GLSL expression string (all values kept in [-1, 1]).
 *
 * This is the GPU rendering path — it converts the tree into a single GLSL
 * expression that gets injected into a fragment shader. The GPU evaluates this
 * expression in parallel across all pixels, making it orders of magnitude faster
 * than the CPU path for large images. The expression is inlined directly (no
 * function calls), which matters for shader compiler optimization.
 */
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

/**
 * Serialize a node into a compact byte array (the CPU representation).
 *
 * Layout is a pre-order traversal: one opcode byte per node, and for `const`
 * nodes a following signed byte encoding the value quantized to [-1, 1].
 *
 * This byte format is consumed by the CPU rasterizer — it can walk the byte
 * array without needing the full ExprNode tree in memory, which is useful for
 * streaming or embedded contexts where memory is tight.
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
 * consume. The TreeView format is intentionally JSON-serializable so the tree
 * can be sent over the wire or stored without losing information.
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

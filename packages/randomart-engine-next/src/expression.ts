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

import type { SeededRandom } from './prng.js';
import type { ExprNode, ExprNodeType, TreeView } from './types.js';

/**
 * Matching 15-digit PI constant for GLSL output. Uses Math.PI's exact value
 * (3.141592653589793) so CPU evaluate() and GLSL shaders agree to full
 * double precision.
 */
const GL_PI = '3.141592653589793';

/** Operator productions and how many children each takes. */
type OpSpec = {
  type: ExprNodeType;
  arity: number;
  /** Weight for weighted random selection. Default: 1.0 */
  weight?: number;
  /** Category for pool building. Default: 'terminal' if arity === 0, 'structural' otherwise. */
  category?: 'structural' | 'terminal';
};

/**
 * A grammar variant. Different registry rules pick different operator sets and
 * growth biases to produce visually distinct families of art.
 */
export type GrammarSpec = {
  /** Operator productions available at internal (non-terminal) nodes. */
  operators: OpSpec[];
  /**
   * @deprecated Kept for backward compatibility. Growth now uses depth-dependent
   * structuralProbability instead of a fixed coin-flip.
   */
  terminalBias: number;
  /** Maximum tree depth. */
  maxDepth: number;
  /**
   * Minimum depth that must be filled with operators before a terminal may be
   * chosen. This guarantees a visually rich tree instead of collapsing to a
   * bare coordinate or constant near the root.
   */
  minDepth: number;
};

/**
 * Depth below which the shared structureRng drives category selection,
 * keeping the overall tree shape consistent across R/G/B channels.
 * Matches the engine's STRUCTURE_RNG_DEPTH.
 */
const STRUCTURE_RNG_DEPTH = 3;

const DEFAULT_WEIGHT = 1.0;

const DEFAULT_TERMINALS: readonly OpSpec[] = [
  { type: 'x', arity: 0, weight: 1.0, category: 'terminal' },
  { type: 'y', arity: 0, weight: 1.0, category: 'terminal' },
  { type: 'const', arity: 0, weight: 0.5, category: 'terminal' }
] as const;

const categoryOf = (op: OpSpec): 'structural' | 'terminal' =>
  op.category ?? (op.arity === 0 ? 'terminal' : 'structural');

/**
 * Builds the candidate pool by rolling each structural rule independently
 * against structuralProbability. Each rule gets its own RNG draw, so different
 * seeds produce pools of different sizes — this per-rule variance is what drives
 * tree variety. Terminals are always included as a guaranteed fallback.
 */
function buildPool(
  rng: SeededRandom,
  operators: OpSpec[],
  structuralProbability: number
): OpSpec[] {
  const pool: OpSpec[] = [];
  for (const op of operators) {
    if (categoryOf(op) === 'terminal' || rng.next() < structuralProbability) {
      pool.push(op);
    }
  }
  return pool.length > 0 ? pool : [...DEFAULT_TERMINALS];
}

function weightedPick(rng: SeededRandom, pool: OpSpec[]): OpSpec {
  if (pool.length === 0) return DEFAULT_TERMINALS[0]!;
  const totalWeight = pool.reduce((sum, op) => sum + (op.weight ?? DEFAULT_WEIGHT), 0);
  let threshold = rng.next() * totalWeight;
  for (const op of pool) {
    threshold -= op.weight ?? DEFAULT_WEIGHT;
    if (threshold <= 0) return op;
  }
  return pool[pool.length - 1]!;
}

const clamp = (v: number): number => (v < -1 ? -1 : v > 1 ? 1 : v);

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

  // Build operator list: spec operators + default terminals if no terminals in spec
  const hasTerminals = spec.operators.some((op) => categoryOf(op) === 'terminal');
  const operators = hasTerminals ? spec.operators : [...spec.operators, ...DEFAULT_TERMINALS];

  let pool: OpSpec[];

  if (forceTerminal) {
    pool = operators.filter((op) => categoryOf(op) === 'terminal');
    if (pool.length === 0) pool = [...DEFAULT_TERMINALS];
  } else if (forceOperator) {
    pool = operators.filter((op) => categoryOf(op) === 'structural');
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
 *
 * @param structureRng  Shared RNG for structural decisions (shape consistency).
 * @param channelRng    Per-channel RNG for per-channel variation.
 * @param currentDepth  Current depth from root (starts at 0).
 * @param maxDepth      Maximum tree depth.
 * @param spec          Grammar variant.
 */
export function buildTree(
  structureRng: SeededRandom,
  channelRng: SeededRandom,
  currentDepth: number,
  maxDepth: number,
  spec: GrammarSpec
): ExprNode {
  const rngToUse = currentDepth < STRUCTURE_RNG_DEPTH ? structureRng : channelRng;

  const hasTerminals = spec.operators.some((op) => categoryOf(op) === 'terminal');
  const operators = hasTerminals ? spec.operators : [...spec.operators, ...DEFAULT_TERMINALS];

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

/** Evaluate a node at normalized coordinates x, y (each in [-1, 1]). */
export function evaluate(node: ExprNode, x: number, y: number): number {
  switch (node.type) {
    case 'x':
      return x;
    case 'y':
      return y;
    case 'const':
      return node.value ?? 0;
    case 'sum': {
      const [a, b] = node.children!;
      return clamp((evaluate(a!, x, y) + evaluate(b!, x, y)) / 2);
    }
    case 'product': {
      const [a, b] = node.children!;
      return clamp(evaluate(a!, x, y) * evaluate(b!, x, y));
    }
    case 'mod': {
      const [a, b] = node.children!;
      const av = evaluate(a!, x, y);
      const bv = evaluate(b!, x, y);
      if (Math.abs(bv) < 1e-6) return 0;
      // Use GLSL-compatible modulo: a - b * floor(a/b) — always non-negative
      // when b > 0, matching GLSL mod() semantics exactly.
      return clamp(av - bv * Math.floor(av / bv));
    }
    case 'pow': {
      const [base, exp] = node.children!;
      const bv = evaluate(base!, x, y);
      const ev = Math.max(-3.0, Math.min(3.0, evaluate(exp!, x, y)));
      return clamp(Math.sign(bv) * Math.pow(Math.abs(bv), ev));
    }
    case 'less-than': {
      const [a, b] = node.children!;
      return evaluate(a!, x, y) < evaluate(b!, x, y) ? 1.0 : -1.0;
    }
    case 'greater-than': {
      const [a, b] = node.children!;
      return evaluate(a!, x, y) > evaluate(b!, x, y) ? 1.0 : -1.0;
    }
    case 'step': {
      const [a, b] = node.children!;
      return evaluate(a!, x, y) >= evaluate(b!, x, y) ? 1.0 : -1.0;
    }
    case 'if': {
      const [cond, truthy, falsy] = node.children!;
      return evaluate(cond!, x, y) > 0.0 ? evaluate(truthy!, x, y) : evaluate(falsy!, x, y);
    }
    case 'smoothstep': {
      const [edge0, edge1, val] = node.children!;
      const e0 = evaluate(edge0!, x, y);
      const e1 = evaluate(edge1!, x, y);
      const v = evaluate(val!, x, y);
      const t = Math.max(0.0, Math.min(1.0, (v - e0) / (e1 - e0 || 1)));
      return clamp(t * t * (3.0 - 2.0 * t) * 2.0 - 1.0);
    }
    case 'clamp': {
      const [cv, lo, hi] = node.children!;
      const val = evaluate(cv!, x, y);
      const loV = evaluate(lo!, x, y);
      const hiV = evaluate(hi!, x, y);
      return clamp(Math.min(hiV, Math.max(loV, val)));
    }
    case 'sin':
      return clamp(Math.sin(Math.PI * evaluate(node.children![0]!, x, y)));
    case 'cos':
      return clamp(Math.cos(Math.PI * evaluate(node.children![0]!, x, y)));
    case 'abs':
      return clamp(Math.abs(evaluate(node.children![0]!, x, y)) * 2 - 1);
    case 'well': {
      // A "well" function: 1 - 2 / (1 + v^2)^8, a classic random-art primitive.
      const v = evaluate(node.children![0]!, x, y);
      return clamp(1 - 2 / Math.pow(1 + v * v, 8));
    }
    case 'tent': {
      const v = evaluate(node.children![0]!, x, y);
      return clamp(1 - 2 * Math.abs(v));
    }
    case 'mix': {
      const [a, b, t] = node.children!;
      const tv = (evaluate(t!, x, y) + 1) / 2;
      return clamp(evaluate(a!, x, y) * (1 - tv) + evaluate(b!, x, y) * tv);
    }
    // Terminals — pixel-space derived
    case 'random': {
      const dot = Math.abs(x) * 12.9898 + Math.abs(y) * 78.233;
      const val = Math.sin(dot) * 43758.5453;
      return clamp((val - Math.floor(val)) * 2.0 - 1.0);
    }
    case 'radial':
      return clamp(Math.sqrt(x * x + y * y) * 2.0 - 1.0);
    case 'sweep':
      return clamp((Math.atan2(y, x) / Math.PI) * 2.0 - 1.0);
    case 'fbm': {
      let value = 0.0;
      let amplitude = 0.5;
      let px = x;
      let py = y;
      for (let i = 0; i < 5; i++) {
        const n = Math.sin(px * 12.9898 + py * 78.233) * 43758.5453;
        value += amplitude * ((n - Math.floor(n)) * 2.0 - 1.0);
        px *= 2.0;
        py *= 2.0;
        amplitude *= 0.5;
      }
      return clamp(value);
    }
    case 'recaman-pattern': {
      const d = Math.sqrt(x * x + y * y);
      const step = Math.floor(d * 10.0);
      let val = 0.0;
      for (let i = 1; i < 12; i++) {
        if (i > step) break;
        const raw = Math.sin(val * 12.9898) * 43758.5453;
        const flip = raw - Math.floor(raw);
        if (flip > 0.5 && val - i > 0.0) {
          val -= i;
        } else {
          val += i;
        }
      }
      return clamp((val % 5.0) / 5.0);
    }
    case 'nested-oscillation':
      return clamp(Math.sin(x * Math.sin(y * Math.PI) * Math.PI));
    // Transforms — unary
    case 'sqrt':
      return clamp(Math.sqrt(Math.abs(evaluate(node.children![0]!, x, y)) + 1e-10));
    case 'exp': {
      const val = Math.max(-1.0, Math.min(1.0, evaluate(node.children![0]!, x, y)));
      return clamp(((Math.exp(val) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0);
    }
    case 'log': {
      const val = Math.abs(evaluate(node.children![0]!, x, y));
      return clamp((Math.log(val + 1.0) / 0.69314718056) * 2.0 - 1.0);
    }
    case 'fract': {
      const v = evaluate(node.children![0]!, x, y);
      return clamp((v - Math.floor(v)) * 2.0 - 1.0);
    }
    default:
      return 0;
  }
}

/** Render a node as a GLSL expression string (all values kept in [-1, 1]). */
export function toGLSL(node: ExprNode): string {
  switch (node.type) {
    case 'x':
      return 'p.x';
    case 'y':
      return 'p.y';
    case 'const':
      return (node.value ?? 0).toFixed(4);
    case 'sum':
      return `clamp((${toGLSL(node.children![0]!)} + ${toGLSL(node.children![1]!)}) * 0.5, -1.0, 1.0)`;
    case 'product':
      return `clamp((${toGLSL(node.children![0]!)}) * (${toGLSL(node.children![1]!)}), -1.0, 1.0)`;
    case 'mod':
      return `(abs(${toGLSL(node.children![1]!)}) < 1e-6 ? 0.0 : mod(${toGLSL(node.children![0]!)}, ${toGLSL(node.children![1]!)}))`;
    case 'pow': {
      const baseExpr = toGLSL(node.children![0]!);
      const expExpr = `clamp(${toGLSL(node.children![1]!)}, -3.0, 3.0)`;
      return `(sign(${baseExpr}) * pow(abs(${baseExpr}), ${expExpr}))`;
    }
    case 'less-than':
      return `(${toGLSL(node.children![0]!)} < ${toGLSL(node.children![1]!)} ? 1.0 : -1.0)`;
    case 'greater-than':
      return `(${toGLSL(node.children![0]!)} > ${toGLSL(node.children![1]!)} ? 1.0 : -1.0)`;
    case 'step':
      return `(2.0 * step(${toGLSL(node.children![0]!)}, ${toGLSL(node.children![1]!)}) - 1.0)`;
    case 'if':
      return `(${toGLSL(node.children![0]!)} > 0.0 ? ${toGLSL(node.children![1]!)} : ${toGLSL(node.children![2]!)})`;
    case 'smoothstep':
      return `(2.0 * smoothstep(${toGLSL(node.children![0]!)}, ${toGLSL(node.children![1]!)}, ${toGLSL(node.children![2]!)}) - 1.0)`;
    case 'clamp':
      return `clamp(${toGLSL(node.children![0]!)}, ${toGLSL(node.children![1]!)}, ${toGLSL(node.children![2]!)})`;
    case 'sin':
      return `sin(${GL_PI} * (${toGLSL(node.children![0]!)}))`;
    case 'cos':
      return `cos(${GL_PI} * (${toGLSL(node.children![0]!)}))`;
    case 'abs':
      return `clamp(abs(${toGLSL(node.children![0]!)}) * 2.0 - 1.0, -1.0, 1.0)`;
    case 'well':
      return `clamp(1.0 - 2.0 / pow(1.0 + pow(${toGLSL(node.children![0]!)}, 2.0), 8.0), -1.0, 1.0)`;
    case 'tent':
      return `clamp(1.0 - 2.0 * abs(${toGLSL(node.children![0]!)}), -1.0, 1.0)`;
    case 'mix':
      return `mix(${toGLSL(node.children![0]!)}, ${toGLSL(node.children![1]!)}, (${toGLSL(node.children![2]!)}) * 0.5 + 0.5)`;
    // Terminals — pixel-space derived
    case 'random':
      return `(fract(sin(abs(p.x) * 12.9898 + abs(p.y) * 78.233) * 43758.5453) * 2.0 - 1.0)`;
    case 'radial':
      return `(length(p) * 2.0 - 1.0)`;
    case 'sweep':
      return `(atan(p.y, p.x) / ${GL_PI} * 2.0 - 1.0)`;
    case 'fbm': {
      // Unrolled 5-octave value-noise FBM. Kept inline (not using the
      // glsl-library fbmNoise) so CPU evaluate() and GLSL agree exactly.
      const noise = (pxExpr: string, pyExpr: string) =>
        `(fract(sin(${pxExpr} * 12.9898 + ${pyExpr} * 78.233) * 43758.5453) * 2.0 - 1.0)`;
      return [
        `(( ${noise('p.x', 'p.y')}`,
        `+ 0.5 * ${noise('p.x * 2.0', 'p.y * 2.0')}`,
        `+ 0.25 * ${noise('p.x * 4.0', 'p.y * 4.0')}`,
        `+ 0.125 * ${noise('p.x * 8.0', 'p.y * 8.0')}`,
        `+ 0.0625 * ${noise('p.x * 16.0', 'p.y * 16.0')} ) * 0.67)`
      ].join('\n');
    }
    case 'recaman-pattern':
      return `pseudoRecaman(p)`;
    case 'nested-oscillation':
      return `sin(p.x * sin(p.y * ${GL_PI}) * ${GL_PI})`;
    // Transforms — unary
    case 'sqrt':
      return `sqrt(abs(${toGLSL(node.children![0]!)}) + 1e-10)`;
    case 'exp': {
      const inner = `clamp(${toGLSL(node.children![0]!)}, -1.0, 1.0)`;
      return `(((exp(${inner}) - 0.36787944117) / 2.35040238729) * 2.0 - 1.0)`;
    }
    case 'log':
      return `((log(abs(${toGLSL(node.children![0]!)}) + 1.0) / 0.69314718056) * 2.0 - 1.0)`;
    case 'fract':
      return `(fract(${toGLSL(node.children![0]!)}) * 2.0 - 1.0)`;
    default:
      return '0.0';
  }
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

/**
 * Serialize a node into a compact byte array (the CPU representation).
 *
 * Layout is a pre-order traversal: one opcode byte per node, and for `const`
 * nodes a following signed byte encoding the value quantized to [-1, 1].
 */
export function toBytes(node: ExprNode): Uint8Array {
  const opcodes: Record<ExprNodeType, number> = {
    x: 1,
    y: 2,
    const: 3,
    sum: 4,
    product: 5,
    mod: 6,
    sin: 7,
    cos: 8,
    abs: 9,
    well: 10,
    tent: 11,
    mix: 12,
    // S2 — terminals
    random: 13,
    radial: 14,
    sweep: 15,
    fbm: 16,
    'recaman-pattern': 17,
    'nested-oscillation': 18,
    // S2 — transforms
    sqrt: 19,
    exp: 20,
    log: 21,
    fract: 22,
    // S3 — combinators
    pow: 23,
    'less-than': 24,
    'greater-than': 25,
    step: 26,
    if: 27,
    smoothstep: 28,
    clamp: 29
  };
  const out: number[] = [];
  const walk = (n: ExprNode): void => {
    out.push(opcodes[n.type]);
    if (n.type === 'const') {
      const q = Math.round((clamp(n.value ?? 0) + 1) * 127.5);
      out.push(Math.max(0, Math.min(255, q)));
    }
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return Uint8Array.from(out);
}

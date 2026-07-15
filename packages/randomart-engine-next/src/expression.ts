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

/** Operator productions and how many children each takes. */
type OpSpec = {
  type: ExprNodeType;
  arity: number;
};

/**
 * A grammar variant. Different registry rules pick different operator sets and
 * growth biases to produce visually distinct families of art.
 */
export type GrammarSpec = {
  /** Operator productions available at internal (non-terminal) nodes. */
  operators: OpSpec[];
  /** Probability of stopping early (choosing a terminal) before max depth. */
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

const clamp = (v: number): number => (v < -1 ? -1 : v > 1 ? 1 : v);

/**
 * Recursively grow an expression node.
 *
 * @param rng    Seeded random stream (advances as the tree grows).
 * @param spec   Grammar variant controlling operators and growth.
 * @param depth  Remaining depth budget (counts down toward the leaves).
 */
export function grow(rng: SeededRandom, spec: GrammarSpec, depth: number): ExprNode {
  // How deep we currently are, measured from the root.
  const currentDepth = spec.maxDepth - depth;
  const forceTerminal = depth <= 0;
  const forceOperator = currentDepth < spec.minDepth;
  const chooseTerminal = !forceOperator && (forceTerminal || rng.next() < spec.terminalBias);

  if (chooseTerminal) {
    const pick = rng.nextInt(3);
    if (pick === 0) return { type: 'x' };
    if (pick === 1) return { type: 'y' };
    return { type: 'const', value: Number(rng.nextRange(-1, 1).toFixed(4)) };
  }

  const op = spec.operators[rng.nextInt(spec.operators.length)]!;
  const children: ExprNode[] = [];
  for (let i = 0; i < op.arity; i++) {
    children.push(grow(rng, spec, depth - 1));
  }
  return { type: op.type, children };
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
      const bv = evaluate(b!, x, y);
      if (Math.abs(bv) < 1e-6) return 0;
      return clamp(evaluate(a!, x, y) % bv);
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
      return `mod(${toGLSL(node.children![0]!)}, ${toGLSL(node.children![1]!)} + 1e-6)`;
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
      return `sin(3.14159265 * (${toGLSL(node.children![0]!)}))`;
    case 'cos':
      return `cos(3.14159265 * (${toGLSL(node.children![0]!)}))`;
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
      return `(atan(p.y, p.x) / 3.1415926535 * 2.0 - 1.0)`;
    case 'fbm': {
      // Unrolled 5-octave value-noise FBM (S6 will extract into glsl-library.ts)
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
      return `sin(p.x * sin(p.y * 3.141592653589793) * 3.141592653589793)`;
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

/** Render a node as a human-readable math string. */
export function toMathString(node: ExprNode): string {
  switch (node.type) {
    case 'x':
      return 'x';
    case 'y':
      return 'y';
    case 'const':
      return String(node.value ?? 0);
    case 'sum':
      return `(${toMathString(node.children![0]!)} + ${toMathString(node.children![1]!)}) / 2`;
    case 'product':
      return `(${toMathString(node.children![0]!)} · ${toMathString(node.children![1]!)})`;
    case 'mod':
      return `(${toMathString(node.children![0]!)} mod ${toMathString(node.children![1]!)})`;
    case 'pow':
      return `(${toMathString(node.children![0]!)}^${toMathString(node.children![1]!)})`;
    case 'less-than':
      return `(${toMathString(node.children![0]!)} < ${toMathString(node.children![1]!)} ? 1 : -1)`;
    case 'greater-than':
      return `(${toMathString(node.children![0]!)} > ${toMathString(node.children![1]!)} ? 1 : -1)`;
    case 'step':
      return `step(${toMathString(node.children![0]!)}, ${toMathString(node.children![1]!)})`;
    case 'if':
      return `(if ${toMathString(node.children![0]!)} > 0 ? ${toMathString(node.children![1]!)} : ${toMathString(node.children![2]!)})`;
    case 'smoothstep':
      return `smoothstep(${toMathString(node.children![0]!)}, ${toMathString(node.children![1]!)}, ${toMathString(node.children![2]!)})`;
    case 'clamp':
      return `clamp(${toMathString(node.children![0]!)}, ${toMathString(node.children![1]!)}, ${toMathString(node.children![2]!)})`;
    case 'sin':
      return `sin(π·${toMathString(node.children![0]!)})`;
    case 'cos':
      return `cos(π·${toMathString(node.children![0]!)})`;
    case 'abs':
      return `(2·|${toMathString(node.children![0]!)}| − 1)`;
    case 'well':
      return `well(${toMathString(node.children![0]!)})`;
    case 'tent':
      return `(1 − 2·|${toMathString(node.children![0]!)}|)`;
    case 'mix':
      return `mix(${toMathString(node.children![0]!)}, ${toMathString(node.children![1]!)}, ${toMathString(node.children![2]!)})`;
    // Terminals — pixel-space derived
    case 'random':
      return 'random(p)';
    case 'radial':
      return 'radial(p)';
    case 'sweep':
      return 'sweep(p)';
    case 'fbm':
      return 'fbm(p)';
    case 'recaman-pattern':
      return 'recaman(p)';
    case 'nested-oscillation':
      return 'nested-oscillation(p)';
    // Transforms — unary
    case 'sqrt':
      return `sqrt(|${toMathString(node.children![0]!)}|)`;
    case 'exp':
      return `normalized_e^(${toMathString(node.children![0]!)})`;
    case 'log':
      return `normalized_log(${toMathString(node.children![0]!)})`;
    case 'fract':
      return `fract(${toMathString(node.children![0]!)})`;
    default:
      return '0';
  }
}

/** Render a node as a nested, serializable tree view. */
export function toTreeView(node: ExprNode): TreeView {
  const label = node.type === 'const' ? `const(${node.value ?? 0})` : node.type;
  const view: TreeView = { label, type: node.type };
  if (node.type === 'const') view.value = node.value ?? 0;
  if (node.children && node.children.length > 0) {
    view.children = node.children.map(toTreeView);
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

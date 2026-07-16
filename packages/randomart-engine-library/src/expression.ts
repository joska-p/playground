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
    mix: 12
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

/**
 * Human-readable formatting for expression trees.
 *
 * Two output formats:
 *  - **Math string** — a compact, Unicode-rich formula (e.g. `sin(π·x)`).
 *  - **Tree view** — an indented ASCII tree using `├──` / `└──` box-drawing.
 *
 * Both walk the tree recursively and delegate to the node type. Unicode
 * operators used: π (pi), · (multiplication dot), mod, − (minus).
 */

import { toStructuredView } from './expression.js';
import type { ExprNode, TreeView } from './types.js';

// ---------------------------------------------------------------------------
// Math string
// ---------------------------------------------------------------------------

/** Render an expression node as a human-readable math formula. */
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

// ---------------------------------------------------------------------------
// ASCII tree view
// ---------------------------------------------------------------------------

/** Render an expression node as an indented ASCII tree. */
export function toTreeView(node: ExprNode): string {
  return renderTreeView(toStructuredView(node));
}

function renderTreeView(view: TreeView, depth = 0): string {
  const indent = '  '.repeat(depth);
  const isLeaf = !view.children || view.children.length === 0;
  const connector = isLeaf ? '└── ' : '├── ';
  const lines = `${indent}${connector}${view.label}\n`;
  if (!view.children) return lines;
  return lines + view.children.map((child) => renderTreeView(child, depth + 1)).join('');
}

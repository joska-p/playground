/**
 * Human-readable formatting for expression trees.
 *
 * Two output formats:
 *  - **Math string** — a compact, Unicode-rich formula (e.g. `sin(π·x)`).
 *  - **Tree view** — an indented ASCII tree using `├──` / `└──` box-drawing.
 *
 * Both walk the tree recursively and delegate to the operator registry. Unicode
 * operators used: π (pi), · (multiplication dot), mod, − (minus).
 */

import { toStructuredView } from './expression.js';
import { OPERATORS } from './grammar/operators/registry.js';
import type { ExprNode, TreeView } from './types.js';

// ---------------------------------------------------------------------------
// Math string
// ---------------------------------------------------------------------------

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

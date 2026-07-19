import type { OperatorId } from './grammar/operators/registry.js';
import { getOperator } from './grammar/operators/registry.js';
import { toStructuredView } from './tree.js';
import type { Node } from './types.js';

export type TreeView = {
  label: string;
  type: OperatorId;
  value?: number;
  children?: TreeView[];
};

export function toMathString(node: Node): string {
  if (node.type === 'const') return String(node.value ?? 0);

  const op = getOperator(node.type);
  if (op.arity === 0) return op.toMathString({});

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, toMathString(node.children![i]!)])
  ) as Record<string, string>;
  return op.toMathString(args);
}

export function toTreeView(node: Node): string {
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

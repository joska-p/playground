import type { OperatorId } from './grammar/operators/registry.js';
import { getOperator } from './grammar/operators/registry.js';
import { toStructuredView, type Node } from './tree.js';

/** A node rendered for display — a label, its operator id, an optional constant, and children. */
export type TreeView = {
    label: string;
    type: OperatorId;
    value?: number;
    children?: TreeView[];
};

/** Render the tree as a math expression, e.g. `((x + y) / 2)`. */
export function toMathString(node: Node): string {
    const op = getOperator(node.type);
    const resolvedArgs: Record<string, string> = {};

    for (const name of op.argNames) {
        const val = node.args[name];
        resolvedArgs[name] = typeof val === 'number' ? String(val) : toMathString(val!);
    }

    return op.toMathString({ args: resolvedArgs });
}

/** Render the tree as an ASCII tree diagram. */
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

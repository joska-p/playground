import { getRule } from '../grammar/registry';
import type { ExpressionNode } from '../types';

export function nodeToMathString(node: ExpressionNode): string {
  if (node.ruleId === 'x') return 'x';
  if (node.ruleId === 'y') return 'y';
  if (node.ruleId === 'constant') return (node.constantValue ?? 0).toFixed(2);

  const rule = getRule(node.ruleId);
  if (!rule) return '?';

  return rule.toMathString(node.args.map(nodeToMathString));
}

export function nodeToTreeView(node: ExpressionNode, depth = 0): string {
  const indent = '  '.repeat(depth);

  if (node.ruleId === 'x' || node.ruleId === 'y') {
    return `${indent}└── ${node.ruleId}\n`;
  }
  if (node.ruleId === 'constant') {
    return `${indent}└── const(${(node.constantValue ?? 0).toFixed(2)})\n`;
  }

  const rule = getRule(node.ruleId);
  if (!rule) return `${indent}└── ?\n`;

  return rule.toTreeView(
    node.args.map((child) => nodeToTreeView(child, depth + 1)),
    depth
  );
}

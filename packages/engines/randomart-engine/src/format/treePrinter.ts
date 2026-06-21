import { getRule } from '../grammar/registry';
import type { ExpressionNode } from '../types';

function formatNodeValue(node: ExpressionNode): string {
  if (node.ruleId === 'constant' && node.constantValue !== undefined) {
    return node.constantValue.toFixed(2);
  }
  return '';
}

export function nodeToMathString(node: ExpressionNode): string {
  if (node.ruleId === 'x') return 'x';
  if (node.ruleId === 'y') return 'y';
  if (node.ruleId === 'constant') return formatNodeValue(node);

  const rule = getRule(node.ruleId);
  if (!rule) return '?';

  const args = node.args.map(nodeToMathString);

  return rule.toMathString(args);
}

export function nodeToTreeView(node: ExpressionNode, depth = 0): string {
  const indent = '  '.repeat(depth);

  if (node.ruleId === 'x' || node.ruleId === 'y') {
    return `${indent}└── ${node.ruleId}\n`;
  }
  if (node.ruleId === 'constant') {
    const val = formatNodeValue(node);
    return `${indent}└── const(${val})\n`;
  }

  const rule = getRule(node.ruleId);
  if (!rule) return `${indent}└── ?\n`;

  const args = node.args.map((child) => nodeToTreeView(child, depth + 1));

  return rule.toTreeView(args, depth);
}

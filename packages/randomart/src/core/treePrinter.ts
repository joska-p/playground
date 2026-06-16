import { getRule } from './grammar/registry';
import type { ExpressionNode } from './types';

function formatNodeValue(node: ExpressionNode): string {
  if (node.ruleId === 'constant' && node.constantValue !== undefined) {
    return node.constantValue.toFixed(2);
  }
  return '';
}

export function nodeToMathString(node: ExpressionNode): string {
  const rule = getRule(node.ruleId);
  if (!rule) return '?';

  const args = node.args.map(nodeToMathString);

  if (node.ruleId === 'constant') {
    args[0] = formatNodeValue(node);
  }

  return rule.toMathString(args);
}

export function nodeToTreeView(node: ExpressionNode, depth = 0): string {
  const rule = getRule(node.ruleId);
  if (!rule) return `${'  '.repeat(depth)}└── ?\n`;

  const args = node.args.map((child) => nodeToTreeView(child, depth + 1));

  if (node.ruleId === 'constant') {
    const val = formatNodeValue(node);
    return `${'  '.repeat(depth)}└── const(${val})\n`;
  }

  return rule.toTreeView(args, depth);
}

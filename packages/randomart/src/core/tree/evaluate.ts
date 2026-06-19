import { getRule } from '../grammar/registry';
import type { ExpressionNode } from '../types';

export function evaluateNode(
  node: ExpressionNode,
  x: number,
  y: number,
  t: number = 0
): number {
  const rule = getRule(node.ruleId);
  if (!rule) return 0;

  if (node.ruleId === 'x') return x;
  if (node.ruleId === 'y') return y;
  if (node.ruleId === 't') return t;

  const lazyArgs = node.args.map((child) => {
    return () => evaluateNode(child, x, y, t);
  });

  if (rule.id === 'constant' && node.constantValue !== undefined) {
    return node.constantValue;
  }

  return rule.evaluate(lazyArgs, x, y, t);
}

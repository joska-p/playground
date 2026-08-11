import { getRule, type RuleId } from '../grammar/registry';
import type { ExpressionNode } from '../types';

/**
 * Evaluates a tree node at a coordinate and time, returning a value in [-1, 1].
 * Terminal nodes (`x`, `y`, `constant`) short-circuit; everything else is
 * dispatched to its rule's `evaluate`.
 */
export function evaluateNode(node: ExpressionNode, x: number, y: number, t = 0): number {
    // Terminal nodes: early-exit before any rule lookup or arg construction
    if (node.ruleId === 'x') return x;
    if (node.ruleId === 'y') return y;
    if (node.ruleId === 'constant') return node.constantValue ?? 0;

    const rule = getRule(node.ruleId as RuleId);
    if (!rule) return 0;

    const lazyArgs = node.args.map((child) => () => evaluateNode(child, x, y, t));
    return rule.evaluate(lazyArgs, x, y, t, node);
}

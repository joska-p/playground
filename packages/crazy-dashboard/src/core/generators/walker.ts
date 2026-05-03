import type { WalkerRule, WalkerRuleContext } from "../types.js";
import { defaultWalkerRule } from "../rules/walker-rules.js";

function buildWalkerContext(
  current: { x: number; y: number },
  timestamp: number,
  bounds: { width: number; height: number }
): WalkerRuleContext {
  return { current, timestamp, bounds };
}

function generateWalker(
  rule: WalkerRule = defaultWalkerRule,
  current: { x: number; y: number } = { x: 50, y: 50 },
  timestamp: number = Date.now(),
  bounds: { width: number; height: number } = { width: 100, height: 100 }
): { x: number; y: number } {
  const context = buildWalkerContext(current, timestamp, bounds);
  return rule.getNext(context);
}

export { generateWalker, buildWalkerContext };

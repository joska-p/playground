import type { CursorRule, CursorRuleContext } from "../types.js";
import { defaultCursorRule } from "../rules/cursor-rules.js";

function buildCursorContext(
  current: { x: number; y: number },
  timestamp: number
): CursorRuleContext {
  const bounds =
    typeof document !== "undefined"
      ? {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        }
      : { width: 1920, height: 1080 };
  return { current, timestamp, bounds };
}

function generateCursor(
  rule: CursorRule = defaultCursorRule,
  current: { x: number; y: number } = { x: 0, y: 0 },
  timestamp: number = Date.now()
): { x: number; y: number } {
  const context = buildCursorContext(current, timestamp);
  return rule.getNext(context);
}

export { generateCursor, buildCursorContext };

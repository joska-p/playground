import type { MemoryRule, MemoryRuleContext } from "../types.js";
import { gradualMemoryRule } from "../rules/memory-rules.js";

function buildMemoryContext(current: number, timestamp: number): MemoryRuleContext {
  const context: MemoryRuleContext = { current, timestamp };

  if (
    typeof performance !== "undefined" &&
    "memory" in performance &&
    (performance as unknown as { memory: { usedJSHeapSize: number; jsHeapSizeLimit: number } })
      .memory
  ) {
    const perfMemory = (
      performance as unknown as { memory: { usedJSHeapSize: number; jsHeapSizeLimit: number } }
    ).memory;
    context.performanceMemory = {
      usedJSHeapSize: perfMemory.usedJSHeapSize,
      jsHeapSizeLimit: perfMemory.jsHeapSizeLimit,
    };
  }

  return context;
}

function generateMemory(
  rule: MemoryRule = gradualMemoryRule,
  current: number = 30,
  timestamp: number = Date.now()
): number {
  const context = buildMemoryContext(current, timestamp);
  return rule.getNext(context);
}

export { generateMemory, buildMemoryContext };

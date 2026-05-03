import type { CpuRule, CpuRuleContext } from "../types.js";
import { sineCpuRule } from "../rules/cpu-rules.js";

function buildCpuContext(current: number, timestamp: number): CpuRuleContext {
  return { current, timestamp };
}

function generateCpu(
  rule: CpuRule = sineCpuRule,
  current: number = 50,
  timestamp: number = Date.now()
): number {
  const context = buildCpuContext(current, timestamp);
  return rule.getNext(context);
}

export { generateCpu, buildCpuContext };

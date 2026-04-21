import type { SequenceRule } from "./rules.js";

export const generateSequence = (
  rule: SequenceRule,
  steps: number,
): number[] => {
  const sequence: number[] = [0];
  const seen = new Set([0]);
  let current = 0;
  const safeSteps = Math.min(steps, rule.maxSteps);

  for (let i = 1; i < safeSteps; i++) {
    current = rule.getNext({
      index: i,
      current,
      sequence,
      seen,
    });
    sequence.push(current);
    seen.add(current);
  }
  return sequence;
};

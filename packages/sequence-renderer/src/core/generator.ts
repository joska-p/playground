import type { SequenceRule } from "./rules.js";

export const generateSequence = (
  rule: SequenceRule,
  steps: number,
): number[] => {
  const sequence: number[] = [0];
  const seen = new Set([0]);
  let current = 0;

  for (let i = 1; i < steps; i++) {
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

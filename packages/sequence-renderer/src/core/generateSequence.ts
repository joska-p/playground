import type { SequenceRule } from './sequence-rules';

function generateSequence({
  sequenceRule,
  steps,
}: {
  sequenceRule: SequenceRule;
  steps: number;
}): number[] {
  const sequence: number[] = [0];
  const seen = new Set([0]);
  let current = 0;
  const safeSteps = Math.min(steps, sequenceRule.maxSteps);

  for (let i = 1; i < safeSteps; i++) {
    current = sequenceRule.getNext({
      index: i,
      current,
      sequence,
      seen,
    });
    sequence.push(current);
    seen.add(current);
  }
  return sequence;
}

export { generateSequence };

import type { SequenceRule } from './rules/types';

function generateSequence({
  sequenceRule,
  steps,
  seed
}: {
  sequenceRule: SequenceRule;
  steps: number;
  seed?: string;
}): number[] {
  const sequence: number[] = [0];
  const seen = new Set([0]);
  let current = 0;
  const safeSteps = sequenceRule.maxSteps === 0 ? steps : Math.min(steps, sequenceRule.maxSteps);

  for (let i = 1; i < safeSteps; i++) {
    current = sequenceRule.getNext({
      index: i,
      current,
      sequence,
      seen,
      seed
    });
    sequence.push(current);
    seen.add(current);
  }
  return sequence;
}

export { generateSequence };

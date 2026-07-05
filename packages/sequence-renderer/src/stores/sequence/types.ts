import type { SequenceRule } from '@repo/sequence-engine/rules/types';

type SequenceState = {
  sequenceRule: SequenceRule;
  steps: number;
  seed: string;
  sequence: number[];
};

export type { SequenceState };

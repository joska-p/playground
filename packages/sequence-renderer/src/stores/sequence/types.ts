import type { SequenceRule } from '@repo/sequence-engine/rules/types';

interface SequenceState {
    sequenceRule: SequenceRule;
    steps: number;
    seed: string;
    sequence: number[];
}

export type { SequenceState };

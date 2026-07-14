import { generateSequence } from '@repo/sequence-engine/engine';
import { recamanRule } from '@repo/sequence-engine/rules/recaman';
import { create } from 'zustand';
import type { SequenceState } from './types';

const sequenceStore = create<SequenceState>(() => {
  return {
    sequenceRule: recamanRule,
    steps: 2,
    seed: 'random seed',
    sequence: generateSequence({ sequenceRule: recamanRule, steps: 2 })
  };
});

export { sequenceStore };

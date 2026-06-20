import type { SequenceRule } from '@repo/sequence-engine/rules/types';
import { sequenceStore } from '../store';

export function useSequenceRule(): SequenceRule {
  return sequenceStore((s) => s.sequenceRule);
}

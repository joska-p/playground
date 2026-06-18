import { sequenceStore } from '../store';

export function useSequenceSequence(): number[] {
  return sequenceStore((s) => s.sequence);
}

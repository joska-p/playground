import { sequenceStore } from '../store';

export function useSequenceSteps(): number {
  return sequenceStore((s) => s.steps);
}

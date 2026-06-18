import { sequenceStore } from '../store';

export function useBasePresetId(): string | null {
  return sequenceStore((s) => s.basePresetId);
}

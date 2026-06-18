import type { SequenceRule } from '../../../core/rules/types';
import { sequenceStore } from '../store';

export function useSequenceRule(): SequenceRule {
  return sequenceStore((s) => s.sequenceRule);
}

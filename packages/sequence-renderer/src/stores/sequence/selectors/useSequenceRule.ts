import { sequenceStore } from '../store';
import type { SequenceRule } from '../../../core/rules/types';

export function useSequenceRule(): SequenceRule {
  return sequenceStore((s) => s.sequenceRule);
}

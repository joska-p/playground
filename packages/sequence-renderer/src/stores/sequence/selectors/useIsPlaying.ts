import { sequenceStore } from '../store';

export function useIsPlaying(): boolean {
  return sequenceStore((s) => s.isPlaying);
}

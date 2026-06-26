import { sequenceStore } from '../store';

function useSeed() {
  return sequenceStore((s) => s.seed);
}

export { useSeed };

import { useStore } from 'zustand';
import type { SeededRandom } from '../../../core/random/SeededRandom';
import { randomartStore } from '../store';

export function useRngB(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngB);
}

import { useStore } from 'zustand';
import type { SeededRandom } from '../../../core/random/SeededRandom';
import { randomartStore } from '../store';

export function useRngR(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngR);
}

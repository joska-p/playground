import { useStore } from 'zustand';
import type { SeededRandom } from '../../../core/random/SeededRandom';
import { randomartStore } from '../store';

export function useRngG(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngG);
}

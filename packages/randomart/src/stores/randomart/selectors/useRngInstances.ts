import { useStore } from 'zustand';
import type { SeededRandom } from '../../../core/random/SeededRandom';
import { randomartStore } from '../store';

export function useRngR(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngR);
}

export function useRngG(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngG);
}

export function useRngB(): SeededRandom {
  return useStore(randomartStore, (s) => s.rngB);
}

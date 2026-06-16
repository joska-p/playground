import { useStore } from 'zustand';
import { randomartStore } from '../store';

export function useSeedText(): string {
  return useStore(randomartStore, (s) => s.seedText);
}

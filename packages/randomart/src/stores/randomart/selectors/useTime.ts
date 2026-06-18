import { useStore } from 'zustand';
import { randomartStore } from '../store';

export function useTime(): number {
  return useStore(randomartStore, (s) => s.time);
}

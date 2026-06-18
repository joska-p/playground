import { useStore } from 'zustand';
import { randomartStore } from '../store';

export function useMaxDepth(): number {
  return useStore(randomartStore, (s) => s.maxDepth);
}

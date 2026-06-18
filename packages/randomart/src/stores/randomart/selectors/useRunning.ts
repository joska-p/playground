import { useStore } from 'zustand';
import { randomartStore } from '../store';

export function useRunning(): boolean {
  return useStore(randomartStore, (s) => s.running);
}

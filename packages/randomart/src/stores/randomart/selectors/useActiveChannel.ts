import { useStore } from 'zustand';
import { randomartStore } from '../store';

export function useActiveChannel(): 'red' | 'green' | 'blue' {
  return useStore(randomartStore, (s) => s.activeChannel);
}

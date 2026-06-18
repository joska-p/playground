import { useStore } from 'zustand';
import { randomartStore } from '../store';

export function useEnabledRuleIds(): string[] {
  return useStore(randomartStore, (s) => s.enabledRuleIds);
}

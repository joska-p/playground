import { useStore } from 'zustand';
import { simulationStore } from '../store.ts';

const useRuleId = () => useStore(simulationStore, (s) => s.ruleId);

export { useRuleId };

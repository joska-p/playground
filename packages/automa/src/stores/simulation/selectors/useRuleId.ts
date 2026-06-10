import { useStore } from 'zustand';
import { simulationStore } from '../store';

const useRuleId = () => useStore(simulationStore, (s) => s.ruleId);

export { useRuleId };

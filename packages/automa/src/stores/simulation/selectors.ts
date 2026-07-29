import { useStore } from 'zustand';
import { simulationStore } from './store';

const useCols = () => useStore(simulationStore, (s) => s.cols);
const useGeneration = () => useStore(simulationStore, (s) => s.generation);
const useRows = () => useStore(simulationStore, (s) => s.rows);
const useRuleId = () => useStore(simulationStore, (s) => s.ruleId);

export { useCols, useGeneration, useRows, useRuleId };

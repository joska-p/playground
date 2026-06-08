import { useStore } from 'zustand';
import { simulationStore } from './store.ts';

const useGrid = () => useStore(simulationStore, (s) => s.grid);

const useGeneration = () => useStore(simulationStore, (s) => s.generation);

const useCols = () => useStore(simulationStore, (s) => s.cols);

const useRows = () => useStore(simulationStore, (s) => s.rows);

const useRuleId = () => useStore(simulationStore, (s) => s.ruleId);

export { useCols, useGeneration, useGrid, useRows, useRuleId };

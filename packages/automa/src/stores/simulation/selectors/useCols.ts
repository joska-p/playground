import { useStore } from 'zustand';
import { simulationStore } from '../store.ts';

const useCols = () => useStore(simulationStore, (s) => s.cols);

export { useCols };

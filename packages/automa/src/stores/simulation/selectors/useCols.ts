import { useStore } from 'zustand';
import { simulationStore } from '../store';

const useCols = () => useStore(simulationStore, (s) => s.cols);

export { useCols };

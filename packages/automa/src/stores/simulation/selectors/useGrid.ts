import { useStore } from 'zustand';
import { simulationStore } from '../store.ts';

const useGrid = () => useStore(simulationStore, (s) => s.grid);

export { useGrid };

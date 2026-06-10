import { useStore } from 'zustand';
import { simulationStore } from '../store';

const useGrid = () => useStore(simulationStore, (s) => s.grid);

export { useGrid };

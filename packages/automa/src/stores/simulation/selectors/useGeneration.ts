import { useStore } from 'zustand';
import { simulationStore } from '../store.ts';

const useGeneration = () => useStore(simulationStore, (s) => s.generation);

export { useGeneration };

import { useStore } from 'zustand';
import { simulationStore } from '../store';

const useGeneration = () => useStore(simulationStore, (s) => s.generation);

export { useGeneration };

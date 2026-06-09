import { useStore } from 'zustand';
import { simulationStore } from '../store.ts';

const useRows = () => useStore(simulationStore, (s) => s.rows);

export { useRows };

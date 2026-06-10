import { useStore } from 'zustand';
import { simulationStore } from '../store';

const useRows = () => useStore(simulationStore, (s) => s.rows);

export { useRows };

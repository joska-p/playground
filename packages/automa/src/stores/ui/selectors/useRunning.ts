import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const useRunning = () => useStore(uiStore, (s) => s.running);

export { useRunning };

import { useStore } from 'zustand';
import { uiStore } from '../store';

const useRunning = () => useStore(uiStore, (s) => s.running);

export { useRunning };

import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const useSpeedMs = () => useStore(uiStore, (s) => s.speedMs);

export { useSpeedMs };

import { useStore } from 'zustand';
import { uiStore } from '../store';

const useSpeedMs = () => useStore(uiStore, (s) => s.speedMs);

export { useSpeedMs };

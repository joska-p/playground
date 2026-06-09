import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const useGlowColor = () => useStore(uiStore, (s) => s.glowColor);

export { useGlowColor };

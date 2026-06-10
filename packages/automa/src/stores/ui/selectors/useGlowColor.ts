import { useStore } from 'zustand';
import { uiStore } from '../store';

const useGlowColor = () => useStore(uiStore, (s) => s.glowColor);

export { useGlowColor };

import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const useShaderId = () => useStore(uiStore, (s) => s.shaderId);

export { useShaderId };

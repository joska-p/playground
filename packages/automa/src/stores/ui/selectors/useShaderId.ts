import { useStore } from 'zustand';
import { uiStore } from '../store';

const useShaderId = () => useStore(uiStore, (s) => s.shaderId);

export { useShaderId };

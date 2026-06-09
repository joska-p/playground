import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const useBrushMode = () => useStore(uiStore, (s) => s.toolMode);

export { useBrushMode };

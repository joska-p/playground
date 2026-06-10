import { useStore } from 'zustand';
import { uiStore } from '../store';

const useBrushMode = () => useStore(uiStore, (s) => s.toolMode);

export { useBrushMode };

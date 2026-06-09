import { useStore } from 'zustand';
import { uiStore } from '../store.ts';

const usePaletteBrush = () => useStore(uiStore, (s) => s.paletteBrush);

export { usePaletteBrush };

import { useStore } from 'zustand';
import { uiStore } from '../store';

const usePaletteBrush = () => useStore(uiStore, (s) => s.paletteBrush);

export { usePaletteBrush };

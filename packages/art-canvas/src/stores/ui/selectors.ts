import { useStore } from 'zustand';
import { uiStore } from './store';

export const useInputMode = () => {
  const inputMode = useStore(uiStore, (state) => state.inputMode);
  return inputMode;
};

export const useSeed = () => {
  const seed = useStore(uiStore, (state) => state.seed);
  return seed;
};

export const useComplexity = () => {
  const complexity = useStore(uiStore, (state) => state.complexity);
  return complexity;
};

export const useMood = () => {
  const mood = useStore(uiStore, (state) => state.mood);
  return mood;
};

export const usePalette = () => {
  const palette = useStore(uiStore, (state) => state.palette);
  return palette;
};

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

export const useDepth = () => {
  const depth = useStore(uiStore, (state) => state.depth);
  return depth;
};

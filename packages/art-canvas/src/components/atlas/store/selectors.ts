import { useStore } from 'zustand';
import { atlasStore } from './store';

export const useSeed = () => {
  const seed = useStore(atlasStore, (state) => state.seed);
  return seed;
};

export const useComplexity = () => {
  const complexity = useStore(atlasStore, (state) => state.complexity);
  return complexity;
};

export const useModulo = () => {
  const modulo = useStore(atlasStore, (state) => state.modulo);
  return modulo;
};

export const usePalette = () => {
  const palette = useStore(atlasStore, (state) => state.palette);
  return palette;
};

export const useGlitch = () => {
  const glitch = useStore(atlasStore, (state) => state.glitch);
  return glitch;
};

export const useSymbolType = () => {
  const symbolType = useStore(atlasStore, (state) => state.symbolType);
  return symbolType;
};

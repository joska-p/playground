import { createStore, useStore } from 'zustand';
import type { MoodName } from '../../assembly/moods';
import type { PalettePresetName } from '../../palettes/registry';

export type StoreState = {
  seed: string;
  complexity: number;
  mood: MoodName;
  palette: PalettePresetName;
};

const store = createStore<StoreState>(() => ({
  seed: 'random seed',
  complexity: 3,
  mood: 'organic',
  palette: 'iridescent_opal'
}));

export const useSeed = () => {
  const seed = useStore(store, (state) => state.seed);
  return seed;
};
export const useComplexity = () => {
  const complexity = useStore(store, (state) => state.complexity);
  return complexity;
};

export const useMood = () => {
  const mood = useStore(store, (state) => state.mood);
  return mood;
};

export const usePalette = () => {
  const palette = useStore(store, (state) => state.palette);
  return palette;
};

export const setSeed = (seed: string) => {
  store.setState({ seed });
};

export const setComplexity = (complexity: number) => {
  store.setState({ complexity });
};

export const setMood = (mood: MoodName) => {
  store.setState({ mood });
};

export const setPalette = (palette: PalettePresetName) => {
  store.setState({ palette });
};

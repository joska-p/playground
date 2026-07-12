import { createStore, useStore } from 'zustand';

export type StoreState = {
  divisions: number;
  lightness: number;
  chroma: number;
};

const store = createStore<StoreState>(() => ({
  divisions: 5,
  lightness: 0.7,
  chroma: 0.15
}));

export const useDivisions = () => {
  const divisions = useStore(store, (state) => state.divisions);
  return divisions;
};

export const useLightness = () => {
  const lightness = useStore(store, (state) => state.lightness);
  return lightness;
};

export const useChroma = () => {
  const chroma = useStore(store, (state) => state.chroma);
  return chroma;
};

export const setDivisions = (divisions: number) => {
  store.setState({ divisions });
};

export const setLightness = (lightness: number) => {
  store.setState({ lightness });
};

export const setChroma = (chroma: number) => {
  store.setState({ chroma });
};

import { createStore, useStore } from 'zustand';

export type InputMode = 'seed' | 'folded-space' | 'atlas' | 'manual';

type UiStoreState = {
  inputMode: InputMode;
  seed: string;
  complexity: number;
  mood: string;
  palette: string;
};

const uiStore = createStore<UiStoreState>(() => ({
  inputMode: 'seed',
  seed: 'random seed',
  complexity: 3,
  mood: 'organic',
  palette: 'iridescent_opal'
}));

export const useInputMode = () => {
  const inputMode = useStore(uiStore, (state) => state.inputMode);
  return inputMode;
};

export const setUiMode = (inputMode: InputMode) => {
  uiStore.setState({ inputMode });
};

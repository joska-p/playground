import { createStore } from 'zustand';
import type { UiStoreState } from './types';

const uiStore = createStore<UiStoreState>(() => ({
  inputMode: 'seed',
  seed: 'random seed',
  complexity: 3,
  mood: 'organic',
  palette: 'iridescent_opal'
}));

export { uiStore };

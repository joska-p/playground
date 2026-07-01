import { createStore } from 'zustand';
import type { UiStoreState } from './types';

const uiStore = createStore<UiStoreState>(() => ({
  inputMode: 'seed',
  seed: 'random seed',
  depth: 3
}));

export { uiStore };

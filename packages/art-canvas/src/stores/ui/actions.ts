import { uiStore } from './store';
import type { InputMode } from './types';

export const setUiMode = (inputMode: InputMode) => {
  uiStore.setState({ inputMode });
};

export const setSeed = (seed: string) => {
  uiStore.setState({ seed });
};

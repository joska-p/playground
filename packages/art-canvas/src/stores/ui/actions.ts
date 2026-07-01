import { uiStore } from './store';
import type { InputMode } from './types';

export const setUiMode = (inputMode: InputMode) => {
  uiStore.setState({ inputMode });
};

export const setSeed = (seed: string) => {
  uiStore.setState({ seed });
};

export const setComplexity = (complexity: number) => {
  uiStore.setState({ complexity });
};

export const setMood = (mood: string) => {
  uiStore.setState({ mood });
};

export const setPalette = (palette: string) => {
  uiStore.setState({ palette });
};

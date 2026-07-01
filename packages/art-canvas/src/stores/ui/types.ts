export type InputMode = 'seed' | 'controled' | 'manual';

export type UiStoreState = {
  inputMode: InputMode;
  seed: string;
  depth: number;
};

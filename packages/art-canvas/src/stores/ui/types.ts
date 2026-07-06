export type InputMode = 'seed' | 'folded-space' | 'atlas';

export type UiStoreState = {
  inputMode: InputMode;
  seed: string;
  complexity: number;
  mood: string;
  palette: string;
};

type BrushMode = 'draw' | 'erase';

type AutomaStoreInit = {
  rows: number;
  cols: number;
  initialDensity: number;
  seed: number;
};

export type { AutomaStoreInit, BrushMode };

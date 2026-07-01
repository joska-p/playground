export type PalettePreset = {
  name: string;
  weight?: number;
  a: string;
  b: string;
  c: string;
  d: string;
};

export type SeededRandom = {
  next: () => number;
  pick: <T>(arr: T[]) => T;
  pickWeighted: <
    T extends {
      weight?: number;
    }
  >(
    arr: T[]
  ) => T;
  range: (min: number, max: number, precision?: number) => string;
  readonly choiceHistory: number[];
  readonly initialHash: number;
};

export type ParamDefinition =
  | { type: 'global'; value: string } // e.g. 'u_time', 'u_mouse'
  | { type: 'range'; min: number; max: number; precision?: number } // e.g. rng scale between 2.0 and 7.0
  | { type: 'literal'; value: string | number }; // Fixed values

export type ShaderModule = {
  name: string;
  category: 'space' | 'shapes' | 'effects';
  code: string;
  weight?: number;
  params?: Record<string, ParamDefinition>;
  getCall: (args: Record<string, string>) => string;
  deps?: string[];
};

export type ShaderTemplate = {
  name: string;
  weight: number;
  deps?: string[];
  generate: (args: {
    rng: SeededRandom;
    spaceBlock: string;
    shapeBlock: string;
    effectBlock: string;
    palette: PalettePreset;
    uniqueInjectedCode: string;
  }) => string;
};

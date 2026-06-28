export type ParamDescriptor =
  | { type: 'number'; label: string; min: number; max: number; step: number; default: number }
  | { type: 'color'; label: string; default: string }
  | { type: 'string'; label: string; default: string }
  | { type: 'boolean'; label: string; default: boolean };

// Magical type inference mapping the schema type to a TS primitive
type InferParamType<T extends ParamDescriptor> = T['type'] extends 'number'
  ? number
  : T['type'] extends 'boolean'
    ? boolean
    : string;

// Maps the whole object schema into a clean, key-value primitive type
export type InferParams<P extends Record<string, ParamDescriptor>> = {
  [K in keyof P]: InferParamType<P[K]>;
};

export type CanvasLayout = {
  minVal: number;
  maxVal: number;
  valueScale: number;
  offsetX: number;
  offsetY: number;
};

export type CanvasViewport = {
  enabled: boolean;
  zoom: number;
  panX: number;
  panY: number;
};

export type LayerCategory = 'cosmetic' | 'drawing';

// The structured shape of a visual layer
export type VisualLayer<
  P extends Record<string, ParamDescriptor> = Record<string, ParamDescriptor>
> = {
  id: string;
  name: string;
  description: string;
  category: LayerCategory;
  params: P;
  draw: (
    ctx: CanvasRenderingContext2D,
    data: number[],
    params: InferParams<P>, // Fully autocompleted!
    layout: CanvasLayout
  ) => void;
};

export type LayerConfigEntry = {
  layerId: string;
  enabled: boolean;
  params: Record<string, unknown>;
};

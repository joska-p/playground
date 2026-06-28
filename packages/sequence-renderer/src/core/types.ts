export type ParamDescriptor =
  | { label: string; type: 'number'; min: number; max: number; step: number }
  | { label: string; type: 'color'; value?: string }
  | { label: string; type: 'string'; value?: string }
  | { label: string; type: 'boolean'; value?: boolean };

export type LayerCategory = 'cosmetic' | 'drawing';

export type LayerConfigEntry = {
  layerId: string;
  enabled: boolean;
  params: Record<string, unknown>;
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

export type VisualLayer = {
  id: string;
  name: string;
  description: string;
  category: LayerCategory;
  defaults: Record<string, unknown>;
  params: Record<string, ParamDescriptor>;
  draw: (
    ctx: CanvasRenderingContext2D,
    data: number[],
    params: Record<string, unknown>,
    layout: CanvasLayout
  ) => void;
};

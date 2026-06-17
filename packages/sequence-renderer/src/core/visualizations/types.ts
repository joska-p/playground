export type ParamDescriptor =
  | { label: string; type: 'number'; min: number; max: number; step: number }
  | { label: string; type: 'color' };

export type LayerCategory = 'cosmetic' | 'drawing';

export type VisualLayer = {
  id: string;
  name: string;
  description: string;
  category: LayerCategory;
  defaults: Record<string, unknown>;
  params: Record<string, ParamDescriptor>;
  draw: (ctx: CanvasRenderingContext2D, data: number[], params: Record<string, unknown>) => void;
};

export type LayerConfigEntry = {
  layerId: string;
  enabled: boolean;
  params: Record<string, unknown>;
};

export type PresetRecord = {
  id: string;
  name: string;
  layers: LayerConfigEntry[];
  isBuiltIn: boolean;
};

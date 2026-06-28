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

export type PresetRecord = {
  id: string;
  name: string;
  layers: LayerConfigEntry[];
  isBuiltIn: boolean;
};

import type { LayerCategory, LayerConfigEntry, ParamDescriptor } from '@repo/sequence-engine/types';

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

export type { LayerConfigEntry };

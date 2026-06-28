import type { CanvasLayout, InferParams, ParamDescriptor, VisualLayer } from '../types';

interface CreateLayerOptions<P extends Record<string, ParamDescriptor>> {
  id: string;
  name: string;
  description: string;
  category: 'cosmetic' | 'drawing';
  params: P;
  draw: (
    ctx: CanvasRenderingContext2D,
    data: number[],
    params: InferParams<P>,
    layout: CanvasLayout
  ) => void;
}

export function createVisualLayer<P extends Record<string, ParamDescriptor>>(
  options: CreateLayerOptions<P>
): VisualLayer<P> {
  return options;
}

import type { DrawingContext, LayerFactory } from './types';

function layerFactory<TOptions extends Record<string, unknown>>(
  defaults: TOptions,
  draw: (context: DrawingContext, options: TOptions) => void
): LayerFactory<TOptions> {
  // ← add explicit return type (optional but good)
  return (options = {}) => {
    const resolved = { ...defaults, ...options };
    return (context) => {
      context.context.save();
      draw(context, resolved);
      context.context.restore();
    };
  };
}

export { layerFactory };

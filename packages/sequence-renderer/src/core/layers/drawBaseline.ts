import type { VisualLayer } from '../types';

const drawBaseline: VisualLayer = {
  id: 'baseline',
  name: 'Baseline',
  description: 'Horizontal line at y=0',
  category: 'cosmetic',
  defaults: { lineWidth: 1, alpha: 0.15, color: undefined },
  params: {
    lineWidth: {
      label: 'Line Width',
      type: 'number',
      min: 0.5,
      max: 5,
      step: 0.5
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    color: { label: 'Color', type: 'color' }
  },
  draw: (ctx, _data, params, layout) => {
    const { lineWidth = 1, alpha = 0.15, color } = params as Record<string, unknown>;
    const { minVal, maxVal, valueScale, offsetX, offsetY } = layout;
    const textColor = getComputedStyle(ctx.canvas).color || 'black';

    ctx.save();
    ctx.strokeStyle = (color as string) ?? textColor;
    ctx.lineWidth = lineWidth as number;
    ctx.globalAlpha = alpha as number;
    ctx.beginPath();
    ctx.moveTo(offsetX + minVal * valueScale, offsetY);
    ctx.lineTo(offsetX + maxVal * valueScale, offsetY);
    ctx.stroke();
    ctx.restore();
  }
};

export { drawBaseline };

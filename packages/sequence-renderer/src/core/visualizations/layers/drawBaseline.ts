import type { VisualLayer } from '../types';

const drawBaseline: VisualLayer = {
  id: 'baseline',
  name: 'Baseline',
  description: 'Horizontal line at y=0',
  category: 'cosmetic',
  defaults: { lineWidth: 1, alpha: 0.15, color: undefined },
  params: {
    lineWidth: { label: 'Line Width', type: 'number', min: 0.5, max: 5, step: 0.5 },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    color: { label: 'Color', type: 'color' }
  },
  draw: (ctx, data, params) => {
    const { lineWidth = 1, alpha = 0.15, color } = params as Record<string, unknown>;
    const maxVal = Math.max(...data, 0);
    const valueScale = (ctx.canvas.width * 0.95) / (maxVal || 1);
    const offsetX = (ctx.canvas.width - maxVal * valueScale) / 2;
    const offsetY = ctx.canvas.height / 2;
    const textColor = getComputedStyle(ctx.canvas).color || 'black';

    ctx.save();
    ctx.strokeStyle = (color as string) ?? textColor;
    ctx.lineWidth = lineWidth as number;
    ctx.globalAlpha = alpha as number;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX + maxVal * valueScale, offsetY);
    ctx.stroke();
    ctx.restore();
  }
};

export { drawBaseline };

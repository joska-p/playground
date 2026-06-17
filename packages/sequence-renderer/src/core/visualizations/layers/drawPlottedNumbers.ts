import type { VisualLayer } from '../types';

const drawPlottedNumbers: VisualLayer = {
  id: 'plotted-numbers',
  name: 'Plotted Numbers',
  description: 'Dots at each unique sequence value',
  category: 'cosmetic',
  defaults: { radius: 3, alpha: 0.4, color: undefined },
  params: {
    radius: { label: 'Radius', type: 'number', min: 1, max: 20, step: 1 },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    color: { label: 'Color', type: 'color' }
  },
  draw: (ctx, data, params) => {
    const { radius = 3, alpha = 0.4, color } = params as Record<string, unknown>;
    const maxVal = Math.max(...data, 0);
    const valueScale = (ctx.canvas.width * 0.95) / (maxVal || 1);
    const offsetX = (ctx.canvas.width - maxVal * valueScale) / 2;
    const offsetY = ctx.canvas.height / 2;
    const textColor = getComputedStyle(ctx.canvas).color || 'black';

    const plotted = new Set<number>();
    data.forEach((val) => {
      if (!plotted.has(val)) {
        plotted.add(val);
        ctx.save();
        ctx.fillStyle = (color as string) ?? textColor;
        ctx.globalAlpha = alpha as number;
        ctx.beginPath();
        ctx.arc(offsetX + val * valueScale, offsetY, radius as number, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    });
  }
};

export { drawPlottedNumbers };

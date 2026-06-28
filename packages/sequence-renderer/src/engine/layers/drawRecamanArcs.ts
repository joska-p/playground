import type { VisualLayer } from '../types';

const drawRecamanArcs: VisualLayer = {
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  description: 'Semicircle arcs between consecutive sequence values',
  category: 'drawing',
  defaults: { lineWidth: 1, alpha: 1.0, color: undefined },
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
  draw: (ctx, data, params, layout) => {
    const { lineWidth = 1, alpha = 1.0, color } = params as Record<string, unknown>;
    const { valueScale, offsetX, offsetY } = layout;
    if (data.length < 2) return;

    const textColor = getComputedStyle(ctx.canvas).color || 'black';

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.strokeStyle = (color as string) ?? textColor;
    ctx.lineWidth = lineWidth as number;
    ctx.globalAlpha = alpha as number;

    data.forEach((value, index) => {
      const previousValue = data[index - 1];
      if (index > 0 && previousValue !== undefined) {
        const middleValue = ((previousValue + value) / 2) * valueScale;
        const radius = (Math.abs(value - previousValue) / 2) * valueScale;
        ctx.beginPath();
        if (index % 2 === 0) {
          ctx.arc(middleValue, 0, radius, 0, Math.PI);
        } else {
          ctx.arc(middleValue, 0, radius, Math.PI, 0);
        }
        ctx.stroke();
      }
    });

    ctx.restore();
  }
};

export { drawRecamanArcs };

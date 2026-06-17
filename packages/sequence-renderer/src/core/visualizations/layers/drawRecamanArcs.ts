import type { VisualLayer } from '../types';

function maxAbsInterval(data: number[]): number {
  let max = 0;
  for (let i = 1; i < data.length; i++) {
    const abs = Math.abs(data[i] - data[i - 1]);
    if (abs > max) max = abs;
  }
  return max || 1;
}

const drawRecamanArcs: VisualLayer = {
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  description: 'Semicircle arcs between consecutive sequence values',
  category: 'drawing',
  defaults: { lineWidth: 1, alpha: 1.0, color: undefined },
  params: {
    lineWidth: { label: 'Line Width', type: 'number', min: 0.5, max: 5, step: 0.5 },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    color: { label: 'Color', type: 'color' }
  },
  draw: (ctx, data, params) => {
    const { lineWidth = 1, alpha = 1.0, color } = params as Record<string, unknown>;
    if (data.length < 2) return;

    const maxVal = Math.max(...data, 0);
    const maxInterval = maxAbsInterval(data);

    const horizontalScale = (ctx.canvas.width * 0.95) / (maxVal || 1);
    const verticalScale = (ctx.canvas.height * 0.85) / maxInterval;
    const valueScale = Math.min(horizontalScale, verticalScale);

    const offsetX = (ctx.canvas.width - maxVal * valueScale) / 2;
    const offsetY = ctx.canvas.height / 2;
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

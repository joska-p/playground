import type { VisualLayer } from '../types';

const drawConnectionLines: VisualLayer = {
  id: 'connection-lines',
  name: 'Connection Lines',
  description: 'Lines connecting consecutive values, color-cycled by index',
  category: 'drawing',
  defaults: {
    lineWidth: 1.5,
    alpha: 0.8,
    hueCycle: 360,
    saturation: 80,
    lightness: 60
  },
  params: {
    lineWidth: {
      label: 'Line Width',
      type: 'number',
      min: 0.5,
      max: 8,
      step: 0.5
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    hueCycle: {
      label: 'Hue Cycle',
      type: 'number',
      min: 60,
      max: 720,
      step: 30
    },
    saturation: {
      label: 'Saturation',
      type: 'number',
      min: 0,
      max: 100,
      step: 5
    },
    lightness: { label: 'Lightness', type: 'number', min: 0, max: 100, step: 5 }
  },
  draw: (ctx, data, params, layout) => {
    const {
      lineWidth = 1.5,
      alpha = 0.8,
      hueCycle = 360,
      saturation = 80,
      lightness = 60
    } = params as Record<string, unknown>;
    const { valueScale, offsetX, offsetY } = layout;
    if (data.length < 2) return;

    ctx.save();
    ctx.lineWidth = lineWidth as number;
    ctx.globalAlpha = alpha as number;

    for (let i = 1; i < data.length; i++) {
      const hue = ((i / data.length) * (hueCycle as number)) % 360;
      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.beginPath();
      ctx.moveTo(
        offsetX + data[i - 1] * valueScale,
        offsetY
      );
      ctx.lineTo(
        offsetX + data[i] * valueScale,
        offsetY
      );
      ctx.stroke();
    }

    ctx.restore();
  }
};

export { drawConnectionLines };

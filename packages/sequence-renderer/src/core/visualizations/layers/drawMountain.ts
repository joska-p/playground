import type { VisualLayer } from '../types';

const drawMountain: VisualLayer = {
  id: 'mountain',
  name: 'Mountain Fill',
  description: 'Filled area under the sequence curve with gradient',
  category: 'drawing',
  defaults: {
    alpha: 0.4,
    hue: 210,
    saturation: 70,
    lightness: 50,
    gradientHeight: 0.5
  },
  params: {
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    hue: { label: 'Hue', type: 'number', min: 0, max: 360, step: 10 },
    saturation: {
      label: 'Saturation',
      type: 'number',
      min: 0,
      max: 100,
      step: 5
    },
    lightness: {
      label: 'Lightness',
      type: 'number',
      min: 0,
      max: 100,
      step: 5
    },
    gradientHeight: {
      label: 'Gradient Height',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1
    }
  },
  draw: (ctx, data, params, layout) => {
    const {
      alpha = 0.4,
      hue = 210,
      saturation = 70,
      lightness = 50,
      gradientHeight = 0.5
    } = params as Record<string, unknown>;
    const { valueScale, offsetX, offsetY } = layout;
    if (data.length < 2) return;

    const gh = gradientHeight as number;
    const gradHeight = ctx.canvas.height * gh;
    const gradY = offsetY - gradHeight / 2;

    const gradient = ctx.createLinearGradient(0, gradY, 0, gradY + gradHeight);
    gradient.addColorStop(
      0,
      `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
    );
    gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(offsetX + data[0] * valueScale, offsetY);

    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(offsetX + data[i] * valueScale, offsetY);
    }

    ctx.lineTo(
      offsetX + data[data.length - 1] * valueScale,
      offsetY + gradHeight
    );
    ctx.lineTo(offsetX + data[0] * valueScale, offsetY + gradHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
};

export { drawMountain };

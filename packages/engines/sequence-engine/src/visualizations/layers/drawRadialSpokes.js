const drawRadialSpokes = {
  id: 'radial-spokes',
  name: 'Radial Spokes',
  description:
    'Values mapped to polar coordinates — each point is a spoke from center',
  category: 'drawing',
  defaults: {
    lineWidth: 1,
    alpha: 0.7,
    dotRadius: 2,
    saturation: 85,
    lightness: 55,
    scale: 0.8
  },
  params: {
    lineWidth: {
      label: 'Line Width',
      type: 'number',
      min: 0.5,
      max: 5,
      step: 0.5
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    dotRadius: {
      label: 'Dot Radius',
      type: 'number',
      min: 0,
      max: 10,
      step: 1
    },
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
    scale: { label: 'Scale', type: 'number', min: 0.1, max: 2, step: 0.1 }
  },
  draw: (ctx, data, params, layout) => {
    const {
      lineWidth = 1,
      alpha = 0.7,
      dotRadius = 2,
      saturation = 85,
      lightness = 55,
      scale = 0.8
    } = params;
    const { maxVal, offsetX, offsetY } = layout;
    if (data.length === 0) return;
    const cx = offsetX;
    const cy = offsetY;
    const maxR = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4 * scale;
    const maxData = maxVal || 1;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = alpha;
    data.forEach((val, i) => {
      const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2;
      const r = (Math.abs(val) / maxData) * maxR;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      const hue = (i * 137.5) % 360;
      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
      if (dotRadius > 0) {
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    ctx.restore();
  }
};
export { drawRadialSpokes };

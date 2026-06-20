const drawBarChart = {
  id: 'bar-chart',
  name: 'Bar Chart',
  description:
    'Vertical bars from baseline to each sequence value, colored by height',
  category: 'drawing',
  defaults: {
    barWidth: 0.8,
    alpha: 0.7,
    saturation: 80,
    lightness: 55
  },
  params: {
    barWidth: {
      label: 'Bar Width',
      type: 'number',
      min: 0.1,
      max: 1,
      step: 0.1
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
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
      barWidth = 0.8,
      alpha = 0.7,
      saturation = 80,
      lightness = 55
    } = params;
    const { valueScale, offsetX, offsetY, maxVal } = layout;
    if (data.length === 0 || maxVal === 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    const width = valueScale * barWidth;
    data.forEach((val) => {
      const hue = ((Math.abs(val) / maxVal) * 240) % 360;
      const x = offsetX + val * valueScale - width / 2;
      const height = Math.abs(val) * valueScale;
      const dir = val >= 0 ? -1 : 1;
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fillRect(x, offsetY, width, dir * height);
    });
    ctx.restore();
  }
};
export { drawBarChart };

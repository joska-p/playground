const drawPlottedNumbers = {
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
  draw: (ctx, data, params, layout) => {
    const { radius = 3, alpha = 0.4, color } = params;
    const { valueScale, offsetX, offsetY } = layout;
    const textColor = getComputedStyle(ctx.canvas).color || 'black';
    const plotted = new Set();
    data.forEach((val) => {
      if (!plotted.has(val)) {
        plotted.add(val);
        ctx.save();
        ctx.fillStyle = color ?? textColor;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(offsetX + val * valueScale, offsetY, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    });
  }
};
export { drawPlottedNumbers };

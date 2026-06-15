import type { VisualizationLayer } from '../types';

export const drawPlottedNumbers: VisualizationLayer = ({
  context,
  sequence,
  offsetX,
  offsetY,
  valueScale,
  textColor
}) => {
  context.save();
  context.fillStyle = textColor;
  context.globalAlpha = 0.4;
  const plottedPoints = new Set<number>();
  sequence.forEach((val) => {
    if (!plottedPoints.has(val)) {
      plottedPoints.add(val);
      const x = offsetX + val * valueScale;
      context.beginPath();
      context.arc(x, offsetY, 3, 0, 2 * Math.PI);
      context.fill();
    }
  });
  context.restore();
};

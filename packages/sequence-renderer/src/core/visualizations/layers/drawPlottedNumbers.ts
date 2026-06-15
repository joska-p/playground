import type { VisualizationLayer } from '../types';

export type DrawPlottedNumbersOptions = {
  radius?: number;
  alpha?: number;
  color?: string;
};

export const createDrawPlottedNumbers = (
  options: DrawPlottedNumbersOptions = {}
): VisualizationLayer => {
  const { radius = 3, alpha = 0.4, color } = options;

  return ({
    context,
    sequence,
    offsetX,
    offsetY,
    valueScale,
    textColor
  }) => {
    context.save();
    context.fillStyle = color ?? textColor;
    context.globalAlpha = alpha;
    const plottedPoints = new Set<number>();
    sequence.forEach((val) => {
      if (!plottedPoints.has(val)) {
        plottedPoints.add(val);
        const x = offsetX + val * valueScale;
        context.beginPath();
        context.arc(x, offsetY, radius, 0, 2 * Math.PI);
        context.fill();
      }
    });
    context.restore();
  };
};

export const drawPlottedNumbers: VisualizationLayer = createDrawPlottedNumbers();

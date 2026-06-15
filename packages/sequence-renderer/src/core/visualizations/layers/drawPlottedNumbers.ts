import { layerFactory } from '../layerFactory';

export type DrawPlottedNumbersOptions = {
  radius: number;
  alpha: number;
  color?: string;
};

const drawPlottedNumbers = layerFactory<DrawPlottedNumbersOptions>(
  {
    radius: 3,
    alpha: 0.4,
    color: undefined
  },
  (
    { context, sequence, offsetX, offsetY, valueScale, textColor },
    { radius, alpha, color }
  ) => {
    const plottedPoints = new Set<number>();
    sequence.forEach((val) => {
      if (!plottedPoints.has(val)) {
        plottedPoints.add(val);
        const x = offsetX + val * valueScale;
        context.save();
        context.fillStyle = color ?? textColor;
        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(x, offsetY, radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
      }
    });
  }
);

export { drawPlottedNumbers };

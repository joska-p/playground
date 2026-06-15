import type { VisualizationLayer } from '../types';

export type DrawRecamanArcsOptions = {
  lineWidth?: number;
  alpha?: number;
  color?: string;
};

export const createDrawRecamanArcs = (
  options: DrawRecamanArcsOptions = {}
): VisualizationLayer => {
  const { lineWidth = 1, alpha = 1.0, color } = options;

  return ({
    context,
    sequence,
    valueScale,
    offsetX,
    offsetY,
    textColor
  }) => {
    context.save();
    context.translate(offsetX, offsetY);
    context.strokeStyle = color ?? textColor;
    context.lineWidth = lineWidth;
    context.globalAlpha = alpha;

    sequence.forEach((value, index) => {
      const previousValue = sequence[index - 1];
      if (index > 0 && previousValue !== undefined) {
        const middleValue = ((previousValue + value) / 2) * valueScale;
        const radius = (Math.abs(value - previousValue) / 2) * valueScale;

        context.beginPath();
        if (index % 2 === 0) {
          context.arc(middleValue, 0, radius, 0, Math.PI);
        } else {
          context.arc(middleValue, 0, radius, Math.PI, 0);
        }
        context.stroke();
      }
    });

    context.restore();
  };
};

export const drawRecamanArcs: VisualizationLayer = createDrawRecamanArcs();

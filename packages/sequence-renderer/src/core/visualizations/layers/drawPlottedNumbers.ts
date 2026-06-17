import { defineLayer } from '../define-layer';
import type { LayerMeta } from '../types';

type DrawPlottedNumbersOptions = {
  radius: number;
  alpha: number;
  color?: string;
};

const drawPlottedNumbers = defineLayer<DrawPlottedNumbersOptions>()
  .defaults({ radius: 3, alpha: 0.4, color: undefined })
  .draw(
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

const drawPlottedNumbersMeta = {
  id: 'plotted-numbers',
  name: 'Plotted Numbers',
  description: 'Dots at each unique sequence value',
  definition: drawPlottedNumbers,
  defaultParams: { radius: 3, alpha: 0.4, color: undefined },
  params: {
    radius: {
      label: 'Radius',
      type: 'number',
      min: 1,
      max: 20,
      step: 1
    },
    alpha: { label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05 },
    color: { label: 'Color', type: 'color' }
  }
} satisfies LayerMeta<DrawPlottedNumbersOptions>;

export { drawPlottedNumbers, drawPlottedNumbersMeta };

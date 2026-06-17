import { defineScale } from '../define-scale';
import type { ScaleMeta } from '../types';

type LinearScaleOptions = {
  padding: number;
};

const linearScale = defineScale<LinearScaleOptions>()
  .defaults({ padding: 0.95 })
  .calculate(({ sequence, containerSize, options }) => {
    const maxVal = Math.max(...sequence, 0);
    if (maxVal <= 0) return 1;
    return (containerSize.width * options.padding) / maxVal;
  });

const linearScaleMeta = {
  id: 'linear',
  name: 'Linear',
  description: 'Scales values proportionally across the canvas width',
  definition: linearScale,
  defaultParams: { padding: 0.95 },
  params: {
    padding: {
      label: 'Padding',
      type: 'number',
      min: 0.1,
      max: 1,
      step: 0.05
    }
  }
} satisfies ScaleMeta<LinearScaleOptions>;

export { linearScale, linearScaleMeta };

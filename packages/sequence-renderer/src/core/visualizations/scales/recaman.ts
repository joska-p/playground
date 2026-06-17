import { findBiggestInterval } from '../../../utils/find-biggest-interval';
import { defineScale } from '../define-scale';
import type { ScaleMeta } from '../types';

type RecamanScaleOptions = {
  padding: number;
  verticalPadding: number;
};

const recamanScale = defineScale<RecamanScaleOptions>()
  .defaults({ padding: 0.95, verticalPadding: 0.85 })
  .calculate(({ sequence, containerSize, options }) => {
    const maxVal = Math.max(...sequence, 0);
    const maxInterval = findBiggestInterval(sequence);

    const horizontalScale =
      (containerSize.width * options.padding) / (maxVal || 1);
    const verticalScale =
      (containerSize.height * options.verticalPadding) / (maxInterval || 1);

    return Math.min(horizontalScale, verticalScale);
  });

const recamanScaleMeta = {
  id: 'recaman',
  name: 'Recamán',
  description:
    'Considers both horizontal and vertical space for Recamán arcs',
  definition: recamanScale,
  defaultParams: { padding: 0.95, verticalPadding: 0.85 },
  params: {
    padding: {
      label: 'Padding',
      type: 'number',
      min: 0.1,
      max: 1,
      step: 0.05
    },
    verticalPadding: {
      label: 'Vertical Padding',
      type: 'number',
      min: 0.1,
      max: 1,
      step: 0.05
    }
  }
} satisfies ScaleMeta<RecamanScaleOptions>;

export { recamanScale, recamanScaleMeta };

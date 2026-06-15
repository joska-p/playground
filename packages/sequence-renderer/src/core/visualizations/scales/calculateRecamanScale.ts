import { findBiggestInterval } from '../../../utils/find-biggest-interval';
import type { ScaleCalculator } from '../types';

export const calculateRecamanScale: ScaleCalculator = ({
  sequence,
  containerSize
}) => {
  const maxVal = Math.max(...sequence, 0);
  const maxInterval = findBiggestInterval(sequence);

  const padding = 0.95;
  const horizontalScale = (containerSize.width * padding) / (maxVal || 1);
  const verticalScale = (containerSize.height * padding) / (maxInterval || 1);

  return Math.min(horizontalScale, verticalScale);
};

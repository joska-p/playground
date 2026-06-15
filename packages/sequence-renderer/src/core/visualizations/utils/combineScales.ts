import type { ScaleCalculator } from '../types';

export const combineScales =
  (...calculators: ScaleCalculator[]): ScaleCalculator =>
  (args) =>
    Math.min(...calculators.map((c) => c(args)));

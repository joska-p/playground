import type { VisualizationLayer } from '../types';
import { drawBaseline } from '../layers/drawBaseline';
import { drawPlottedNumbers } from '../layers/drawPlottedNumbers';

export const basePreset: VisualizationLayer[] = [
  drawBaseline,
  drawPlottedNumbers
];

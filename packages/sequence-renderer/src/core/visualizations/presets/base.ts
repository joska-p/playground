import { drawBaseline } from '../layers/drawBaseline';
import { drawPlottedNumbers } from '../layers/drawPlottedNumbers';
import type { DrawFn } from '../types';

export const basePreset: DrawFn[] = [
  drawBaseline.with(),
  drawPlottedNumbers.with()
];

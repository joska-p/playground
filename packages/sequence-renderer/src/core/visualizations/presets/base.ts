import { drawBaseline } from '../layers/drawBaseline';
import { drawPlottedNumbers } from '../layers/drawPlottedNumbers';
import type { LayerFactory } from '../types';

export const basePreset: LayerFactory[] = [drawBaseline, drawPlottedNumbers];

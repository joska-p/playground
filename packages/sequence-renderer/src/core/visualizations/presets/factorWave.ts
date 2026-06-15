import { drawFactorWaves } from '../layers/drawFactorWaves';
import type { Visualization } from '../types';
import { visualisationFactory } from '../visualisationFactory';
import { basePreset } from './base';

export const factorWave: Visualization = visualisationFactory({
  id: 'factor-wave',
  name: 'Factor Wave',
  layers: [...basePreset, drawFactorWaves]
});

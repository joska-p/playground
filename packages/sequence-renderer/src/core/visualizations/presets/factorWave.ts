import { factoryVisualization } from '../factory';
import { basePreset } from './base';
import { drawFactorWaves } from '../layers/drawFactorWaves';
import type { Visualization } from '../types';

export const factorWave: Visualization = factoryVisualization({
  id: 'factor-wave',
  name: 'Factor Wave',
  layers: [...basePreset, drawFactorWaves]
});

import { factoryVisualization } from './factoryVisualization';
import { drawBaseline } from './layers/drawBaseline';
import { drawFactorWaves } from './layers/drawFactorWaves';
import { drawPlottedNumbers } from './layers/drawPlottedNumbers';
import type { Visualization } from './types';

export const factorWave: Visualization = factoryVisualization({
  id: 'factor-wave',
  name: 'Factor Wave',
  layers: [drawBaseline, drawPlottedNumbers, drawFactorWaves]
});

import { createVisualization } from '../create-visualization';
import { drawFactorWaves } from '../layers/drawFactorWaves';

import { basePreset } from './base';

export const frontWave = createVisualization({
  id: 'frontWave',
  name: 'Front Wave',
  layers: [...basePreset, drawFactorWaves.with()]
});

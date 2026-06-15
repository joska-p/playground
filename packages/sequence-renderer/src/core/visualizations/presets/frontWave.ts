import { drawFactorWaves } from '../layers/drawFactorWaves';
import { visualisationFactory } from '../visualisationFactory';

import { basePreset } from './base';

export const frontWave = visualisationFactory({
  id: 'frontWave',
  name: 'Front Wave',
  layers: [...basePreset, drawFactorWaves.with()]
});

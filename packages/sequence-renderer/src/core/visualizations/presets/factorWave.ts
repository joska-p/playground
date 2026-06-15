import { drawFactorWaves } from '../layers/drawFactorWaves';
import { visualisationFactory } from '../visualisationFactory';
import { basePreset } from './base';

export const factorWave = visualisationFactory({
  id: 'factor-wave',
  name: 'Factor Wave',
  layers: [...basePreset, drawFactorWaves.with()]
});

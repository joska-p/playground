import { drawRecamanArcs } from '../layers/drawRecamanArcs';
import type { Visualization } from '../types';
import { calculateRecamanScale } from '../utils/calculateRecamanScale';
import { visualisationFactory } from '../visualisationFactory';
import { basePreset } from './base';

export const recamanArcs: Visualization = visualisationFactory({
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  layers: [...basePreset, drawRecamanArcs],
  calculateScale: calculateRecamanScale
});

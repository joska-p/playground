import { factoryVisualization } from '../factory';
import { basePreset } from './base';
import { drawRecamanArcs } from '../layers/drawRecamanArcs';
import type { Visualization } from '../types';
import { calculateRecamanScale } from '../utils/calculateRecamanScale';

export const recamanArcs: Visualization = factoryVisualization({
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  layers: [...basePreset, drawRecamanArcs],
  calculateScale: calculateRecamanScale
});

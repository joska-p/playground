import { factoryVisualization } from './factoryVisualization';
import { drawBaseline } from './layers/drawBaseline';
import { drawPlottedNumbers } from './layers/drawPlottedNumbers';
import { drawRecamanArcs } from './layers/drawRecamanArcs';
import type { Visualization } from './types';
import { calculateRecamanScale } from './utils/calculateRecamanScale';

export const recamanArcs: Visualization = factoryVisualization({
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  layers: [drawBaseline, drawPlottedNumbers, drawRecamanArcs],
  calculateScale: calculateRecamanScale
});

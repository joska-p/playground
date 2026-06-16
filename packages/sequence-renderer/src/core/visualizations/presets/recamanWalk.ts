import { createVisualization } from '../create-visualization';
import { drawRecamanArcs } from '../layers/drawRecamanArcs';
import { calculateRecamanScale } from '../scales/calculateRecamanScale';
import { basePreset } from './base';

export const recamanWalk = createVisualization({
  id: 'recamanWalk',
  name: 'Recamán Walk',
  layers: [...basePreset, drawRecamanArcs.with({ lineWidth: 1, alpha: 1.0 })],
  calculateScale: calculateRecamanScale,
  compatibleWith: (meta) => meta.hasIntervals
});

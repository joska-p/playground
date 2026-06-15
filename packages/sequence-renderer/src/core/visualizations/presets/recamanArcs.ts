import { drawRecamanArcs } from '../layers/drawRecamanArcs';
import { calculateRecamanScale } from '../scales/calculateRecamanScale';
import { visualisationFactory } from '../visualisationFactory';
import { basePreset } from './base';

// presets/recamanArcs.ts — the visualization now owns scale + compat
export const recamanArcs = visualisationFactory({
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  layers: [
    ...basePreset,
    drawRecamanArcs.with({ lineWidth: 1, alpha: 1.0 }) // ← resolved here, no more layer()()
  ],
  calculateScale: calculateRecamanScale,
  compatibleWith: (meta) => meta.hasIntervals
});

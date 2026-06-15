import { drawBaseline } from './layers/drawBaseline';
import { drawFactorWaves } from './layers/drawFactorWaves';
import { drawPlottedNumbers } from './layers/drawPlottedNumbers';
import { drawRecamanArcs } from './layers/drawRecamanArcs';
import { factorWave } from './presets/factorWave';
import { recamanArcs } from './presets/recamanArcs';
import type {
  ScaleCalculator,
  Visualization,
  VisualizationLayer
} from './types';
import { calculateRecamanScale } from './utils/calculateRecamanScale';

export type LayerEntry = {
  id: string;
  name: string;
  layer: VisualizationLayer;
  scaleCalculator?: ScaleCalculator;
  compatibleWith?: (seqMeta: { hasIntervals: boolean }) => boolean;
};

// Preset visualizations registry
const visualizations = new Map<string, Visualization>([
  [recamanArcs.id, recamanArcs],
  [factorWave.id, factorWave]
]);

export function getVisualization(id: string): Visualization | undefined {
  return visualizations.get(id);
}

export function getAllVisualizations(): Visualization[] {
  return Array.from(visualizations.values());
}

// Layer registry
const layerRegistry = new Map<string, LayerEntry>([
  ['baseline', { id: 'baseline', name: 'Baseline', layer: drawBaseline }],
  [
    'plotted-numbers',
    {
      id: 'plotted-numbers',
      name: 'Plotted Numbers',
      layer: drawPlottedNumbers
    }
  ],
  [
    'recaman-arcs',
    {
      id: 'recaman-arcs',
      name: 'Recamán Arcs',
      layer: drawRecamanArcs,
      scaleCalculator: calculateRecamanScale,
      compatibleWith: (meta) => meta.hasIntervals
    }
  ],
  [
    'factor-waves',
    { id: 'factor-waves', name: 'Factor Waves', layer: drawFactorWaves }
  ]
]);

export function getLayer(id: string): LayerEntry | undefined {
  return layerRegistry.get(id);
}

export function getAllLayers(): LayerEntry[] {
  return Array.from(layerRegistry.values());
}

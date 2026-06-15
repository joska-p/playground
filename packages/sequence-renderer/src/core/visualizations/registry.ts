import { drawBaseline } from './layers/drawBaseline';
import { drawFactorWaves } from './layers/drawFactorWaves';
import { drawPlottedNumbers } from './layers/drawPlottedNumbers';
import { drawRecamanArcs } from './layers/drawRecamanArcs';
import { factorWave } from './presets/factorWave';
import { recamanArcs } from './presets/recamanArcs';
import type { LayerEntry, Visualization } from './types';

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
    { id: 'recaman-arcs', name: 'Recamán Arcs', layer: drawRecamanArcs }
  ],
  [
    'factor-waves',
    { id: 'factor-waves', name: 'Factor Waves', layer: drawFactorWaves }
  ]
]);

function getLayer(id: string): LayerEntry | undefined {
  return layerRegistry.get(id);
}

function getAllLayers(): LayerEntry[] {
  return Array.from(layerRegistry.values());
}

export const visualizationRegistry = new Map<string, Visualization>([
  [recamanArcs.id, recamanArcs],
  [factorWave.id, factorWave]
]);

function getVisualization(id: string): Visualization | undefined {
  return visualizationRegistry.get(id);
}

function getAllVisualizations(): Visualization[] {
  return Array.from(visualizationRegistry.values());
}

export { getAllLayers, getAllVisualizations, getLayer, getVisualization };

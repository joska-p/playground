import type { LayerCategory, VisualLayer } from '../types';
import { drawBaseline } from './drawBaseline';
import { drawFactorWaves } from './drawFactorWaves';
import { drawPlottedNumbers } from './drawPlottedNumbers';
import { drawRecamanArcs } from './drawRecamanArcs';

const layers: VisualLayer[] = [
  drawBaseline,
  drawPlottedNumbers,
  drawFactorWaves,
  drawRecamanArcs
];

const layerMap = new Map<string, VisualLayer>(layers.map((l) => [l.id, l]));

function getAllLayers(): VisualLayer[] {
  return layers;
}

function getLayer(id: string): VisualLayer | undefined {
  return layerMap.get(id);
}

function getLayersByCategory(category: LayerCategory): VisualLayer[] {
  return layers.filter((l) => l.category === category);
}

export { getAllLayers, getLayer, getLayersByCategory };

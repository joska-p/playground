import { drawBaselineMeta } from './drawBaseline';
import { drawPlottedNumbersMeta } from './drawPlottedNumbers';
import { drawFactorWavesMeta } from './drawFactorWaves';
import { drawRecamanArcsMeta } from './drawRecamanArcs';
import type { LayerMeta, DrawFn } from '../types';

const layerRegistry = new Map<string, LayerMeta<Record<string, unknown>>>([
  [
    drawBaselineMeta.id,
    drawBaselineMeta as LayerMeta<Record<string, unknown>>
  ],
  [
    drawPlottedNumbersMeta.id,
    drawPlottedNumbersMeta as LayerMeta<Record<string, unknown>>
  ],
  [
    drawFactorWavesMeta.id,
    drawFactorWavesMeta as LayerMeta<Record<string, unknown>>
  ],
  [
    drawRecamanArcsMeta.id,
    drawRecamanArcsMeta as LayerMeta<Record<string, unknown>>
  ]
]);

function getAllLayerMetas(): LayerMeta<Record<string, unknown>>[] {
  return Array.from(layerRegistry.values());
}

function getLayerMeta(
  id: string
): LayerMeta<Record<string, unknown>> | undefined {
  return layerRegistry.get(id);
}

function buildDrawFn(
  layerId: string,
  params: Record<string, unknown>
): DrawFn | undefined {
  const meta = layerRegistry.get(layerId);
  if (!meta) return undefined;
  return meta.definition.with(params);
}

export { getAllLayerMetas, getLayerMeta, buildDrawFn };

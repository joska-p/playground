import type { DrawFn, LayerMeta } from '../types';
import { drawBaselineMeta } from './drawBaseline';
import { drawFactorWavesMeta } from './drawFactorWaves';
import { drawPlottedNumbersMeta } from './drawPlottedNumbers';
import { drawRecamanArcsMeta } from './drawRecamanArcs';

const layerRegistry = new Map<string, LayerMeta<Record<string, unknown>>>([
  [drawBaselineMeta.id, drawBaselineMeta as LayerMeta<Record<string, unknown>>],
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

export { buildDrawFn, getAllLayerMetas, getLayerMeta };

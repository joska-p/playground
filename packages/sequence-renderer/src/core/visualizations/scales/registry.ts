import { linearScaleMeta } from './linear';
import { recamanScaleMeta } from './recaman';
import type { ScaleMeta, ScaleCalculator } from '../types';

const scaleRegistry = new Map<string, ScaleMeta<Record<string, unknown>>>([
  [linearScaleMeta.id, linearScaleMeta as ScaleMeta<Record<string, unknown>>],
  [recamanScaleMeta.id, recamanScaleMeta as ScaleMeta<Record<string, unknown>>]
]);

function getAllScaleMetas(): ScaleMeta<Record<string, unknown>>[] {
  return Array.from(scaleRegistry.values());
}

function getScaleMeta(
  id: string
): ScaleMeta<Record<string, unknown>> | undefined {
  return scaleRegistry.get(id);
}

function buildScaleCalculator(
  id: string,
  params: Record<string, unknown>
): ScaleCalculator | undefined {
  const meta = scaleRegistry.get(id);
  if (!meta) return undefined;
  return meta.definition.with(params);
}

export { getAllScaleMetas, getScaleMeta, buildScaleCalculator };

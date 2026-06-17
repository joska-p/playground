import { createVisualization } from './create-visualization';
import { buildDrawFn, getAllLayerMetas } from './layers/registry';
import { buildScaleCalculator, getAllScaleMetas } from './scales/registry';
import type {
  LayerConfigEntry,
  ScaleCalculator,
  ScaleConfigEntry,
  Visualization
} from './types';

function detectPreferredScale(
  layers: LayerConfigEntry[]
): { id: string; params: Record<string, unknown> } | null {
  const allLayerMetas = getAllLayerMetas();
  for (const entry of layers) {
    if (!entry.enabled) continue;
    const meta = allLayerMetas.find((m) => m.id === entry.layerId);
    if (meta?.preferredScale) {
      const scaleMetas = getAllScaleMetas();
      for (const sm of scaleMetas) {
        if (sm.definition === meta.preferredScale) {
          return { id: sm.id, params: { ...sm.defaultParams } };
        }
      }
    }
  }
  return null;
}

function resolveVisualization(params: {
  layers: LayerConfigEntry[];
  scale: ScaleConfigEntry;
}): Visualization {
  const { layers, scale } = params;

  const enabledLayers = layers.filter((l) => l.enabled);

  const drawFns = enabledLayers
    .map((l) => buildDrawFn(l.layerId, l.params))
    .filter((fn): fn is NonNullable<typeof fn> => fn !== undefined);

  let calculateScale: ScaleCalculator | undefined;
  if (scale.autoDetected) {
    const preferred = detectPreferredScale(layers);
    if (preferred) {
      calculateScale = buildScaleCalculator(preferred.id, preferred.params);
    }
  }
  if (!calculateScale) {
    calculateScale = buildScaleCalculator(scale.id, scale.params);
  }

  return createVisualization({
    id: 'resolved',
    name: 'Custom',
    layers: drawFns,
    calculateScale
  });
}

export { detectPreferredScale, resolveVisualization };

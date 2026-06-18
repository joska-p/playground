import { create } from 'zustand';
import { generateSequence } from '../../core/engine';
import { recamanRule } from '../../core/rules/recaman';
import { builtInPresets, getAllPresets } from '../../core/visualizations/registry';
import type { LayerConfigEntry } from '../../core/visualizations/types';
import type { SequenceState } from './types';

function buildDefaultLayers(): LayerConfigEntry[] {
  const firstPreset = builtInPresets[0];
  if (firstPreset)
    return firstPreset.layers.map((l) => ({ ...l, params: { ...l.params } }));
  return [];
}

const sequenceStore = create<SequenceState>(() => {
  const defaultLayers = buildDefaultLayers();
  return {
    sequenceRule: recamanRule,
    steps: 2,
    layers: defaultLayers,
    sequence: generateSequence({ sequenceRule: recamanRule, steps: 2 }),
    customPresets: getAllPresets().filter((p) => !p.isBuiltIn),
    basePresetId: builtInPresets[0]?.id ?? null,
    viewport: {
      enabled: false,
      zoom: 1,
      panX: 0,
      panY: 0
    }
  };
});

export { sequenceStore };

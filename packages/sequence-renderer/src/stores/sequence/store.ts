import { generateSequence } from '@repo/sequence-engine';
import { recamanRule } from '@repo/sequence-engine/rules/recaman';
import { builtInPresets, getAllPresets } from '@repo/sequence-engine/visualizations';
import type { LayerConfigEntry } from '@repo/sequence-engine/visualizations/types';
import { create } from 'zustand';
import type { SequenceState } from './types';

function buildDefaultLayers(): LayerConfigEntry[] {
  const firstPreset = builtInPresets[0];
  if (firstPreset)
    return firstPreset.layers.map((l: LayerConfigEntry) => ({
      ...l,
      params: { ...l.params }
    }));
  return [];
}

const sequenceStore = create<SequenceState>(() => {
  const defaultLayers = buildDefaultLayers();
  return {
    sequenceRule: recamanRule,
    steps: 2,
    seed: 'random seed',
    layers: defaultLayers,
    sequence: generateSequence({ sequenceRule: recamanRule, steps: 2 }),
    customPresets: getAllPresets().filter((p) => !p.isBuiltIn),
    basePresetId: builtInPresets[0]?.id ?? null,
    isPlaying: false,
    viewport: {
      enabled: false,
      zoom: 1,
      panX: 0,
      panY: 0
    }
  };
});

export { sequenceStore };

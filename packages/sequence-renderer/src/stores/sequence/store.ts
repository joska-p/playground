import { generateSequence } from '@repo/sequence-engine';
import { recamanRule } from '@repo/sequence-engine/rules/recaman';
import type { LayerConfigEntry } from '../../core/types';
import { create } from 'zustand';
import { getAllPresets } from './presetStore';
import type { SequenceState } from './types';

const DEFAULT_LAYERS: LayerConfigEntry[] = [
  { layerId: 'baseline', enabled: true, params: {} },
  { layerId: 'plotted-numbers', enabled: true, params: {} }
];

const sequenceStore = create<SequenceState>(() => {
  return {
    sequenceRule: recamanRule,
    steps: 2,
    seed: 'random seed',
    layers: DEFAULT_LAYERS.map((l) => ({ ...l, params: { ...l.params } })),
    sequence: generateSequence({ sequenceRule: recamanRule, steps: 2 }),
    customPresets: getAllPresets(),
    basePresetId: null,
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

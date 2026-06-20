import type { SequenceRule } from '@repo/sequence-engine/rules/types';
import type {
  CanvasViewport,
  LayerConfigEntry,
  PresetRecord
} from '@repo/sequence-engine/visualizations/types';

type SequenceState = {
  sequenceRule: SequenceRule;
  steps: number;
  layers: LayerConfigEntry[];
  sequence: number[];
  customPresets: PresetRecord[];
  basePresetId: string | null;
  viewport: CanvasViewport;
};

export type { SequenceState };

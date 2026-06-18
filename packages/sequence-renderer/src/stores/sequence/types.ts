import type { SequenceRule } from '../../core/rules/types';
import type {
  CanvasViewport,
  LayerConfigEntry,
  PresetRecord
} from '../../core/visualizations/types';

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

import type { LayerConfigEntry } from '../../../core/visualizations/types';
import { sequenceStore } from '../store';

export function useLayersConfig(): LayerConfigEntry[] {
  return sequenceStore((s) => s.layers);
}

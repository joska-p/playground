import { sequenceStore } from '../store';
import type { LayerConfigEntry } from '../../../core/visualizations/types';

export function useLayersConfig(): LayerConfigEntry[] {
  return sequenceStore((s) => s.layers);
}

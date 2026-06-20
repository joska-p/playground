import type { LayerConfigEntry } from '@repo/sequence-engine/visualizations/types';
import { sequenceStore } from '../store';

export function useLayersConfig(): LayerConfigEntry[] {
  return sequenceStore((s) => s.layers);
}

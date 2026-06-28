import type { LayerConfigEntry } from '../../engine/types';
import { sequenceStore } from '../store';

export function useLayersConfig(): LayerConfigEntry[] {
  return sequenceStore((s) => s.layers);
}

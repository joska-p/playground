import type { LayerConfigEntry } from '../../../core/types';
import { uiStore } from '../store';

export function useLayersConfig(): LayerConfigEntry[] {
  return uiStore((s) => s.layers);
}

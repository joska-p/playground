import type { CanvasViewport, LayerConfigEntry } from '../../core/types';

type UiState = {
  layers: LayerConfigEntry[];
  viewport: CanvasViewport;
};

export type { UiState };

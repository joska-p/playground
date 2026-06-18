import { sequenceStore } from '../store';
import type { CanvasViewport } from '../../../core/visualizations/types';

export function useViewport(): CanvasViewport {
  return sequenceStore((s) => s.viewport);
}

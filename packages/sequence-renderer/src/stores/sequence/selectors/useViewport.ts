import type { CanvasViewport } from '../../core/types';
import { sequenceStore } from '../store';

export function useViewport(): CanvasViewport {
  return sequenceStore((s) => s.viewport);
}

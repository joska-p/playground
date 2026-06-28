import type { CanvasViewport } from '../../engine/types';
import { sequenceStore } from '../store';

export function useViewport(): CanvasViewport {
  return sequenceStore((s) => s.viewport);
}

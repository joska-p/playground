import type { CanvasViewport } from '@repo/sequence-engine/visualizations/types';
import { sequenceStore } from '../store';

export function useViewport(): CanvasViewport {
  return sequenceStore((s) => s.viewport);
}

import type { CanvasViewport } from '../../../core/types';
import { uiStore } from '../store';

export function useViewport(): CanvasViewport {
  return uiStore((s) => s.viewport);
}

import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import { useRandomArtRenderer } from '../hooks/useRandomArtRenderer';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';
import { useRenderMode } from '../stores/randomart/selectors/useRenderMode';
import { useRunning } from '../stores/randomart/selectors/useRunning';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors/useTrees';
import { randomartStore } from '../stores/randomart/store';

export function RandomArtCanvas() {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const trees = { treeR: useTreeR(), treeG: useTreeG(), treeB: useTreeB() };
  const running = useRunning();
  const renderMode = useRenderMode();

  const timeRef = randomartStore.getState().timeRef;

  useRandomArtRenderer(canvasRef, dimensions, trees, running, renderMode === 'canvas');
  useWebGLRenderer(canvasRef, dimensions, trees, running, timeRef, renderMode === 'glsl');

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 flex-1 items-center justify-center self-stretch overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="border-border max-h-full max-w-full rounded-xl border shadow-lg"
        style={{ aspectRatio: '1' }}
      />
    </div>
  );
}

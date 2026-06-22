import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';
import {
  useRunning,
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors';

export function RandomArtCanvas() {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const running = useRunning();

  useWebGLRenderer(canvasRef, dimensions, { treeR, treeG, treeB }, running);

  return (
    <div
      ref={containerRef}
      className="h-full p-4"
    >
      <canvas
        ref={canvasRef}
        className="mx-auto aspect-square h-full rounded-sm"
      />
    </div>
  );
}

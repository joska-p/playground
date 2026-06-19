import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';
import { useRunning, useRenderMode, useTreeR, useTreeG, useTreeB, useCorrelatedRGB } from '../stores/randomart/selectors';

export function RandomArtCanvas() {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const correlatedRGB = useCorrelatedRGB();
  const running = useRunning();
  const renderMode = useRenderMode();

  const canvasTreeR = correlatedRGB ? (treeR.args[0] as typeof treeR) : treeR;
  const canvasTreeG = correlatedRGB ? (treeR.args[1] as typeof treeG) : treeG;
  const canvasTreeB = correlatedRGB ? (treeR.args[2] as typeof treeB) : treeB;

  const glslTrees = { treeR, treeG, treeB };

  useCanvasRenderer(
    canvasRef,
    dimensions,
    canvasTreeR,
    canvasTreeG,
    canvasTreeB,
    renderMode === 'canvas'
  );
  useWebGLRenderer(
    canvasRef,
    dimensions,
    glslTrees,
    running,
    renderMode === 'glsl'
  );

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

import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';
import { useRunning, useRenderMode, useCPUTrees, useGLSLTrees } from '../stores/randomart/selectors';

export function RandomArtCanvas() {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cpuTrees = useCPUTrees();
  const glslTrees = useGLSLTrees();
  const running = useRunning();
  const renderMode = useRenderMode();

  useCanvasRenderer(
    canvasRef,
    dimensions,
    cpuTrees.treeR,
    cpuTrees.treeG,
    cpuTrees.treeB,
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

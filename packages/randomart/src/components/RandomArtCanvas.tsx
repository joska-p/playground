import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';
import { useCorrelatedRGB } from '../stores/randomart/selectors/useCorrelatedRGB';
import { useRenderMode } from '../stores/randomart/selectors/useRenderMode';
import { useRunning } from '../stores/randomart/selectors/useRunning';
import { useTreeB } from '../stores/randomart/selectors/useTreeB';
import { useTreeG } from '../stores/randomart/selectors/useTreeG';
import { useTreeR } from '../stores/randomart/selectors/useTreeR';
import { randomartStore } from '../stores/randomart/store';

export function RandomArtCanvas() {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const running = useRunning();
  const renderMode = useRenderMode();
  const correlatedRGB = useCorrelatedRGB();

  const timeRef = randomartStore.getState().timeRef;

  const canvasTrees = correlatedRGB
    ? { treeR: treeR.args[0], treeG: treeR.args[1], treeB: treeR.args[2] }
    : { treeR, treeG, treeB };

  const glTrees = { treeR, treeG, treeB };

  useCanvasRenderer(
    canvasRef,
    dimensions,
    canvasTrees,
    running,
    renderMode === 'canvas'
  );
  useWebGLRenderer(
    canvasRef,
    dimensions,
    glTrees,
    running,
    timeRef,
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

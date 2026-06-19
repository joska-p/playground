import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import type { ExpressionNode } from '../core/types';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import { CANVAS_CLASS } from './canvasClass';

type Props = {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
};

export function CPUCanvas({ treeR, treeG, treeB }: Props) {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useCanvasRenderer(canvasRef, dimensions, treeR, treeG, treeB);

  return (
    <div
      ref={containerRef}
      className={CANVAS_CLASS.container}
    >
      <canvas
        ref={canvasRef}
        className={CANVAS_CLASS.canvas}
        style={{ aspectRatio: '1' }}
      />
    </div>
  );
}

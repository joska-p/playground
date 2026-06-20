import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import type { ExpressionNode } from '../core/types';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';

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
      className="h-full p-4"
    >
      <canvas
        ref={canvasRef}
        className="mx-auto aspect-square h-full rounded-sm"
      />
    </div>
  );
}

import type { ExpressionNode } from '@repo/randomart-engine/types';
import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';

type Props = {
  treeR: ExpressionNode;
  treeG: ExpressionNode;
  treeB: ExpressionNode;
  running: boolean;
};

export function WebGLCanvas({ treeR, treeG, treeB, running }: Props) {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

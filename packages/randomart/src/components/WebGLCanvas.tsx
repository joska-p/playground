import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useRef } from 'react';
import type { ExpressionNode } from '../core/types';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';
import { CANVAS_CLASS } from './canvasClass';

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

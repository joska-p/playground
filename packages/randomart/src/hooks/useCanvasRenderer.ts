import { useEffect, useRef } from 'react';
import { renderTreesToImageDataAsync } from '../core/render/cpu-renderer';
import type { ExpressionNode } from '../core/types';
import { useTime } from '../stores/randomart/selectors/useTime'; // Import the reactive hook
import { useCanvasSize } from './useCanvasSize';

export function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number },
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  enabled: boolean
) {
  const isRendering = useRef(false);
  const { logicalSize, bitmapSize } = useCanvasSize(dimensions);
  const time = useTime(); // Listen to time updates reactively

  useEffect(() => {
    if (!enabled) return;
    if (dimensions.width <= 0 || dimensions.height <= 0) return;
    if (isRendering.current) return;

    isRendering.current = true;

    renderTreesToImageDataAsync(treeR, treeG, treeB, bitmapSize, time)
      .then((imageData) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = bitmapSize;
        canvas.height = bitmapSize;
        canvas.style.width = `${logicalSize}px`;
        canvas.style.height = `${logicalSize}px`;
        canvas.getContext('2d')?.putImageData(imageData, 0, 0);
      })
      .finally(() => {
        isRendering.current = false;
      });
  }, [
    enabled,
    dimensions,
    treeR,
    treeG,
    treeB,
    bitmapSize,
    time,
    canvasRef,
    logicalSize
  ]); // Added 'time' dependency
}

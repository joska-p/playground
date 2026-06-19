import { useEffect, useRef } from 'react';
import { renderTreesToImageDataAsync } from '../core/render/cpu-renderer';
import type { ExpressionNode } from '../core/types';
import { randomartStore } from '../stores/randomart/store';
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

  useEffect(() => {
    if (!enabled) return;
    if (dimensions.width <= 0 || dimensions.height <= 0) return;
    if (isRendering.current) return;

    isRendering.current = true;
    const currentTime = randomartStore.getState().timeRef.current;

    renderTreesToImageDataAsync(treeR, treeG, treeB, bitmapSize, currentTime)
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
  }, [enabled, dimensions, treeR, treeG, treeB, canvasRef, logicalSize, bitmapSize]);
}

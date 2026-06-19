import { useEffect, useRef } from 'react';
import { renderTreesToImageDataAsync } from '../core/render/cpu-renderer';
import type { ExpressionNode } from '../core/types';
import { randomartStore } from '../stores/randomart/store';
import { useCanvasSize } from './useCanvasSize';

/**
 * No enabled flag — this hook is only mounted when the CPU renderer
 * is active. Conditional rendering in the parent handles the switch.
 */
export function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number },
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode
) {
  const isRendering = useRef(false);
  const pendingRender = useRef(false);
  const { logicalSize, bitmapSize } = useCanvasSize(dimensions);

  useEffect(() => {
    if (bitmapSize <= 0) return;

    if (isRendering.current) {
      pendingRender.current = true;
      return;
    }

    isRendering.current = true;
    pendingRender.current = false;

    const time = randomartStore.getState().time;

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
        if (pendingRender.current) {
          pendingRender.current = false;
          const latestTime = randomartStore.getState().time;
          isRendering.current = true;
          renderTreesToImageDataAsync(
            treeR,
            treeG,
            treeB,
            bitmapSize,
            latestTime
          )
            .then((imageData) => {
              if (!canvasRef.current) return;
              canvasRef.current.getContext('2d')?.putImageData(imageData, 0, 0);
            })
            .finally(() => {
              isRendering.current = false;
            });
        }
      });
  }, [treeR, treeG, treeB, bitmapSize, logicalSize, canvasRef]);
}

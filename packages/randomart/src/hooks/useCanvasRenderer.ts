import { useRef } from 'react';
import { renderTreesToImageDataAsync } from '../core/render/cpu-renderer';
import type { ExpressionNode } from '../core/types';
import { randomartStore } from '../stores/randomart/store';
import { useAnimationLoop } from './useAnimationLoop';
import { useCanvasSize } from './useCanvasSize';

export function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number },
  trees: {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
  },
  running: boolean,
  enabled: boolean
) {
  const elapsedRef = useRef(randomartStore.getState().time);
  const isRendering = useRef(false);
  const { logicalSize, bitmapSize } = useCanvasSize(dimensions);

  useAnimationLoop(
    running,
    (deltaMs) => {
      if (running) {
        elapsedRef.current += deltaMs / 1000;
        randomartStore.getState().timeRef.current = elapsedRef.current;
      }

      if (
        dimensions.width > 0 &&
        dimensions.height > 0 &&
        !isRendering.current
      ) {
        isRendering.current = true;

        renderTreesToImageDataAsync(
          trees.treeR,
          trees.treeG,
          trees.treeB,
          bitmapSize,
          elapsedRef.current
        )
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
      }
    },
    enabled
  );
}

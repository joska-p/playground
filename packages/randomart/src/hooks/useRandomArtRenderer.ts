import { useEffect, useRef } from 'react';
import { renderTreesToImageDataAsync } from '../core/renderer';
import type { ExpressionNode } from '../core/types';
import { randomartStore } from '../stores/randomart/store';

export function useRandomArtRenderer(
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

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let animationFrameId: number;
    let lastTime = performance.now();

    const tick = async (now: number) => {
      if (cancelled) return;

      const delta = now - lastTime;
      lastTime = now;

      if (running) {
        elapsedRef.current += delta / 1000;
        randomartStore.getState().timeRef.current = elapsedRef.current;
      }

      if (
        dimensions.width > 0 &&
        dimensions.height > 0 &&
        !isRendering.current
      ) {
        isRendering.current = true;

        try {
          const { treeR, treeG, treeB } = trees;
          const logicalSize = Math.max(
            100,
            Math.min(
              Math.floor(Math.min(dimensions.width, dimensions.height)),
              1024
            )
          );
          const bitmapSize = Math.min(
            Math.round(logicalSize * (window.devicePixelRatio || 1)),
            2048
          );

          const imageData = await renderTreesToImageDataAsync(
            treeR,
            treeG,
            treeB,
            bitmapSize,
            elapsedRef.current
          );

          if (!cancelled && canvas) {
            canvas.width = bitmapSize;
            canvas.height = bitmapSize;
            canvas.style.width = `${logicalSize}px`;
            canvas.style.height = `${logicalSize}px`;
            canvas.getContext('2d')?.putImageData(imageData, 0, 0);
          }
        } finally {
          isRendering.current = false;
        }
      }

      if (running && !cancelled) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, trees, running, canvasRef, enabled]);
}

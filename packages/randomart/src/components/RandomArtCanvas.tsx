import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { useEffect, useRef } from 'react';
import { renderTreesToImageDataAsync } from '../core/renderer';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors/useTrees';

const MAX_CANVAS_SIZE = 1024;
const MIN_CANVAS_SIZE = 100;
// Hard ceiling on the actual bitmap we render, regardless of DPR, so a
// large container on a high-DPI display can't push the renderer into
// rendering an excessively large image.
const MAX_BITMAP_SIZE = 2048;

export function RandomArtCanvas() {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.classList.remove('opacity-100');
    canvas.classList.add('opacity-60');

    let cancelled = false;

    async function render() {
      // Container hasn't been measured yet (or has no size) — skip this
      // pass rather than rendering a throwaway MIN_CANVAS_SIZE image.
      if (dimensions.width === 0 || dimensions.height === 0) return;

      const logicalSize = Math.max(
        MIN_CANVAS_SIZE,
        Math.min(
          Math.floor(Math.min(dimensions.width, dimensions.height)),
          MAX_CANVAS_SIZE
        )
      );

      const dpr = window.devicePixelRatio || 1;
      const bitmapSize = Math.min(
        Math.round(logicalSize * dpr),
        MAX_BITMAP_SIZE
      );

      try {
        const imageData = await renderTreesToImageDataAsync(
          treeR,
          treeG,
          treeB,
          bitmapSize
        );
        if (!canvas || cancelled) return;

        // Bitmap is rendered at device pixel density...
        canvas.width = bitmapSize;
        canvas.height = bitmapSize;
        // ...but displayed at the logical (CSS-pixel) size, so it stays
        // the same physical size on screen while looking sharp.
        canvas.style.width = `${logicalSize}px`;
        canvas.style.height = `${logicalSize}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Canvas render failed: 2d context unavailable');
          return;
        }
        ctx.putImageData(imageData, 0, 0);
      } catch (err) {
        if (!cancelled) console.error('Canvas render failed:', err);
      } finally {
        if (canvas && !cancelled) {
          canvas.classList.remove('opacity-60');
          canvas.classList.add('opacity-100');
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [dimensions, treeR, treeG, treeB]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 flex-1 items-center justify-center self-stretch overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="border-border max-h-full max-w-full rounded-xl border opacity-100 shadow-lg transition-opacity duration-300"
        style={{ aspectRatio: '1' }}
      />
    </div>
  );
}

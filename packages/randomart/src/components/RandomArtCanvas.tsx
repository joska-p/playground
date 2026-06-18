import { useEffect, useRef } from 'react';
import { useResizeObserver } from '@repo/ui/useResizeObserver';
import { renderTreesToImageDataAsync } from '../core/renderer';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors/useTrees';

const MAX_CANVAS_SIZE = 1024;
const MIN_CANVAS_SIZE = 100;

export function RandomArtCanvas() {
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const size = Math.max(
        MIN_CANVAS_SIZE,
        Math.min(
          Math.floor(Math.min(dimensions.width, dimensions.height)),
          MAX_CANVAS_SIZE
        )
      );

      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const imageData = await renderTreesToImageDataAsync(treeR, treeG, treeB, size);
        if (cancelled) return;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.putImageData(imageData, 0, 0);
      } catch (err) {
        if (!cancelled) console.error('Canvas render failed:', err);
      }
    }

    render();

    return () => { cancelled = true; };
  }, [dimensions, treeR, treeG, treeB]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 flex-1 items-center justify-center overflow-hidden self-stretch"
    >
      <canvas
        ref={canvasRef}
        className="max-h-full max-w-full rounded-xl border border-border shadow-lg"
        style={{ aspectRatio: '1' }}
      />
    </div>
  );
}

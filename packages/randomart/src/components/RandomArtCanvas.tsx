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
      const size = Math.max(
        MIN_CANVAS_SIZE,
        Math.min(
          Math.floor(Math.min(dimensions.width, dimensions.height)),
          MAX_CANVAS_SIZE
        )
      );

      try {
        const imageData = await renderTreesToImageDataAsync(
          treeR,
          treeG,
          treeB,
          size
        );
        if (!canvas || cancelled) return;
        canvas.width = size;
        canvas.height = size;
        canvas.getContext('2d')!.putImageData(imageData, 0, 0);
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

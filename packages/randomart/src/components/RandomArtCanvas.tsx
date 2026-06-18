import { useEffect, useRef, useState } from 'react';
import { renderTreesToImageData } from '../core/renderer';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors/useTrees';

const MAX_CANVAS_SIZE = 1024;
const MIN_CANVAS_SIZE = 100;

export function RandomArtCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const [size, setSize] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const inlineSize = entry.contentBoxSize[0].inlineSize;
      const blockSize = entry.contentBoxSize[0].blockSize;
      const newSize = Math.max(
        MIN_CANVAS_SIZE,
        Math.min(
          Math.floor(Math.min(inlineSize, blockSize)),
          MAX_CANVAS_SIZE
        )
      );
      setSize(newSize);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (size === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d')!;
    const imageData = renderTreesToImageData(treeR, treeG, treeB, size);
    ctx.putImageData(imageData, 0, 0);
  }, [treeR, treeG, treeB, size]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 flex-1 items-center justify-center overflow-hidden self-stretch"
    >
      <canvas
        ref={canvasRef}
        width={size || undefined}
        height={size || undefined}
        className="max-h-full max-w-full rounded-xl border border-border shadow-lg"
        style={{ aspectRatio: '1' }}
      />
    </div>
  );
}

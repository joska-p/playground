import { useEffect, useRef, useTransition } from 'react';
import { renderPixelBuffer } from '../core/randomart-engine';

type Props = {
  seedString: string;
  size?: number;
  maxDepth?: number;
};

export function RandomArtCanvas({
  seedString,
  size = 300,
  maxDepth = 8
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!canvasRef.current || !seedString) return;

    startTransition(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      const pixelBuffer = renderPixelBuffer(seedString, size, maxDepth);

      const imgData = new ImageData(
        new Uint8ClampedArray(pixelBuffer),
        size,
        size
      );

      ctx.putImageData(imgData, 0, 0);
    });
  }, [seedString, size, maxDepth]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="border-border bg-card rounded-xl shadow-lg"
    />
  );
}

import { evaluate } from '@repo/randomart-engine-next';
import type { Node } from '@repo/randomart-engine-next/types';
import { useEffect, useRef } from 'react';

type CanvasCPUProps = {
  node: Node;
  resolution: number;
  sizePx: number;
};

function clamp(v: number): number {
  return v < -1 ? -1 : v > 1 ? 1 : v;
}

export function CanvasCPU({ node, resolution, sizePx }: CanvasCPUProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buffer = new Uint8ClampedArray(resolution * resolution * 4);
    let animationFrameId: number;
    const startTime = performance.now();

    const renderLoop = () => {
      const t = (performance.now() - startTime) / 1000;

      try {
        for (let py = 0; py < resolution; py++) {
          for (let px = 0; px < resolution; px++) {
            const x = (px / resolution) * 2 - 1;
            const y = -((py / resolution) * 2 - 1);
            const idx = (py * resolution + px) * 4;

            const value = evaluate(node, x, y, t);
            const gray = Math.round(clamp(value) * 127.5 + 127.5);

            buffer[idx] = gray;
            buffer[idx + 1] = gray;
            buffer[idx + 2] = gray;
            buffer[idx + 3] = 255;
          }
        }

        ctx.putImageData(new ImageData(buffer, resolution, resolution), 0, 0);
        if (errorRef.current) errorRef.current.style.display = 'none';

        animationFrameId = requestAnimationFrame(renderLoop);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Render error';
        if (errorRef.current) {
          errorRef.current.textContent = msg;
          errorRef.current.style.display = 'flex';
        }
      }
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [node, resolution]);

  return (
    <div
      className="relative"
      style={{ width: sizePx, height: sizePx }}
    >
      <canvas
        ref={canvasRef}
        width={resolution}
        height={resolution}
        style={{ width: sizePx, height: sizePx, imageRendering: 'pixelated' }}
      />
      <div
        ref={errorRef}
        className="bg-surface text-destructive-foreground absolute inset-0 flex items-center justify-center p-1 text-center text-sm"
        style={{ display: 'none' }}
      />
    </div>
  );
}

import type { GrammarRule } from '@repo/randomart-engine/types';
import { useEffect, useRef, useState } from 'react';
import { valueToRGB } from '../../lib/colormap';
import { buildPreviewNode, makeDefaultEvalArgs } from '../../lib/evalHelpers';
import { Corners } from '../ui/Corners';

type ValueCanvasCPUProps = {
  rule: GrammarRule;
  seed: number;
  resolution: number;
  t: number;
  sizePx: number;
};

export function ValueCanvasCPU({ rule, seed, resolution, t, sizePx }: ValueCanvasCPUProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setError(null);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const node = buildPreviewNode(rule, seed);
    const buffer = new Uint8ClampedArray(resolution * resolution * 4);

    try {
      for (let py = 0; py < resolution; py++) {
        for (let px = 0; px < resolution; px++) {
          const x = (px / resolution) * 2 - 1;
          const y = (py / resolution) * 2 - 1;
          const idx = (py * resolution + px) * 4;

          const value = rule.evaluate(makeDefaultEvalArgs(x, y), x, y, t, node);

          if (!Number.isFinite(value)) {
            buffer[idx] = 0;
            buffer[idx + 1] = 0;
            buffer[idx + 2] = 0;
          } else {
            const [r, g, b] = valueToRGB(value);
            buffer[idx] = r;
            buffer[idx + 1] = g;
            buffer[idx + 2] = b;
          }
          buffer[idx + 3] = 255;
        }
      }

      ctx.putImageData(new ImageData(buffer, resolution, resolution), 0, 0);
    } catch (e) {
      // NOTE: original implementation only console.log'd here, so render
      // errors never reached the UI. Surfacing it via state instead.
      setError(e instanceof Error ? e.message : 'Render error');
    }
  }, [rule, seed, resolution, t]);

  return (
    <Corners sizePx={sizePx}>
      <canvas
        ref={canvasRef}
        width={resolution}
        height={resolution}
        style={{ width: sizePx, height: sizePx, imageRendering: 'pixelated' }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-1 text-center text-[10px] text-red-400">
          {error}
        </div>
      )}
    </Corners>
  );
}

import type { ExprNode } from '@repo/randomart-engine-next/types';
import { CanvasCPU } from './CanvasCPU';
import { CanvasGPU } from './CanvasGPU';

type CanvasProp = {
  node: ExprNode;
  resolution: number;
  t: number;
  sizePx: number;
};

export function Canvas({ node, resolution, t, sizePx }: CanvasProp) {
  return (
    <div className="flex gap-3">
      <div>
        <p className="mb-1 text-center font-mono text-[9px] tracking-wider text-neutral-500 uppercase">
          CPU
        </p>
        <CanvasCPU
          node={node}
          resolution={resolution}
          t={t}
          sizePx={sizePx}
        />
      </div>
      <div>
        <p className="mb-1 text-center font-mono text-[9px] tracking-wider text-neutral-500 uppercase">
          GPU
        </p>
        <CanvasGPU
          node={node}
          t={t}
          sizePx={sizePx}
        />
      </div>
    </div>
  );
}

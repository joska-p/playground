import type { ExprNode } from '@repo/randomart-engine-next/types';
import { CanvasCPU } from './CanvasCPU';
import { CanvasGPU } from './CanvasGPU';

type CanvasProp = {
  node: ExprNode;
  resolution: number;
  sizePx: number;
};

export function Canvas({ node, resolution, sizePx }: CanvasProp) {
  return (
    <div className="flex gap-3">
      <div>
        <p className="mb-1 text-center text-xs tracking-wider uppercase">CPU</p>
        <CanvasCPU
          node={node}
          resolution={resolution}
          sizePx={sizePx}
        />
      </div>
      <div>
        <p className="mb-1 text-center text-xs tracking-wider uppercase">GPU</p>
        <CanvasGPU
          node={node}
          sizePx={sizePx}
        />
      </div>
    </div>
  );
}

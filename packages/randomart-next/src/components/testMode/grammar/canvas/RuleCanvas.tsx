import type { Rule } from '@repo/randomart-engine-next/types';
import type { ReactNode } from 'react';
import type { RenderMode } from '../../store';
import { ValueCanvasCPU } from './ValueCanvasCPU';
import { ValueCanvasGPU } from './ValueCanvasGPU';

type RuleCanvasProps = {
  rule: Rule;
  seed: number;
  resolution: number;
  t: number;
  sizePx: number;
  renderMode: RenderMode;
};

/** Single entry point every card/panel uses instead of picking a canvas directly. */
export function RuleCanvas({ rule, seed, resolution, t, sizePx, renderMode }: RuleCanvasProps) {
  if (renderMode === 'gpu') {
    return (
      <ValueCanvasGPU
        rule={rule}
        seed={seed}
        t={t}
        sizePx={sizePx}
      />
    );
  }

  if (renderMode === 'compare') {
    return (
      <div className="flex gap-3">
        <LabeledCanvas label="CPU">
          <ValueCanvasCPU
            rule={rule}
            seed={seed}
            resolution={resolution}
            t={t}
            sizePx={sizePx}
          />
        </LabeledCanvas>
        <LabeledCanvas label="GPU">
          <ValueCanvasGPU
            rule={rule}
            seed={seed}
            t={t}
            sizePx={sizePx}
          />
        </LabeledCanvas>
      </div>
    );
  }

  return (
    <ValueCanvasCPU
      rule={rule}
      seed={seed}
      resolution={resolution}
      t={t}
      sizePx={sizePx}
    />
  );
}

function LabeledCanvas({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-center font-mono text-[9px] tracking-wider text-neutral-500 uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

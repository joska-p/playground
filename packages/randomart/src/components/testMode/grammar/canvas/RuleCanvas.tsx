import { ValueCanvasCPU } from './ValueCanvasCPU';
import { ValueCanvasGPU } from './ValueCanvasGPU';

import type { RenderMode } from '../../store';
import type { GrammarRule } from '@repo/randomart-engine/types';
import type { ReactNode } from 'react';

type RuleCanvasProps = {
    rule: GrammarRule;
    seed: number;
    resolution: number;
    t: number;
    sizePx: number;
    renderMode: RenderMode;
};

/** Single entry point so cards never pick between the CPU/GPU canvases themselves. */
export function RuleCanvas({ rule, seed, resolution, t, sizePx, renderMode }: RuleCanvasProps) {
    if (renderMode === 'gpu') {
        return (
            <ValueCanvasGPU
                rule={rule}
                seed={seed}
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

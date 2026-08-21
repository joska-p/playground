import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

import { buildValueFragmentShader } from '../../glsl/buildValueShader';
import { buildPreviewNode } from '../../lib/evalHelpers';
import { Corners } from '../ui/Corners';

import type { GrammarRule } from '@repo/randomart-engine/types';

type ValueCanvasGPUProps = {
    rule: GrammarRule;
    seed: number;
    sizePx: number;
};

function buildShader(
    rule: GrammarRule,
    seed: number
): { shader: string | null; error: string | null } {
    try {
        const node = buildPreviewNode(rule, seed);

        return { shader: buildValueFragmentShader(rule, node), error: null };
    } catch (e) {
        return {
            shader: null,
            error: e instanceof Error ? e.message : 'GLSL build error'
        };
    }
}

export function ValueCanvasGPU({ rule, seed, sizePx }: ValueCanvasGPUProps) {
    const { shader, error } = buildShader(rule, seed);

    return (
        <Corners sizePx={sizePx}>
            <div style={{ width: sizePx, height: sizePx }}>
                {shader && (
                    <GpuCanvas
                        className="h-full w-full"
                        fragmentShader={shader}
                    />
                )}
            </div>
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-overlay p-1 text-center text-[10px] text-destructive">
                    {error}
                </div>
            )}
        </Corners>
    );
}

import type { GrammarRule } from '@repo/randomart-engine/types';
import { useMemo } from 'react';
import { buildValueFragmentShader } from '../../glsl/buildValueShader';
import { buildPreviewNode } from '../../lib/evalHelpers';
import { Corners } from '../ui/Corners';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

type ValueCanvasGPUProps = {
    rule: GrammarRule;
    seed: number;
    sizePx: number;
};

export function ValueCanvasGPU({ rule, seed, sizePx }: ValueCanvasGPUProps) {
    const { shader, error } = useMemo(() => {
        try {
            const node = buildPreviewNode(rule, seed);
            return {
                shader: buildValueFragmentShader(rule, node),
                error: null as string | null
            };
        } catch (e) {
            return {
                shader: null,
                error: e instanceof Error ? e.message : 'GLSL build error'
            };
        }
    }, [rule, seed]);

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
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-1 text-center text-[10px] text-red-400">
                    {error}
                </div>
            )}
        </Corners>
    );
}

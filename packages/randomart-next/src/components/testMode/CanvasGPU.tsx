import type { Node } from '@repo/randomart-engine-next/types';
import { useMemo } from 'react';
import { buildValueFragmentShader } from './buildValueShader';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

type CanvasGPUProps = {
    node: Node;
    sizePx: number;
};

export function CanvasGPU({ node, sizePx }: CanvasGPUProps) {
    const { shader, error } = useMemo(() => {
        try {
            return {
                shader: buildValueFragmentShader(node),
                error: null as string | null
            };
        } catch (e) {
            return {
                shader: null,
                error: e instanceof Error ? e.message : 'GLSL build error'
            };
        }
    }, [node]);

    return (
        <div
            className="relative"
            style={{ width: sizePx, height: sizePx }}
        >
            {shader && (
                <GpuCanvas
                    className="h-full w-full"
                    fragmentShader={shader}
                />
            )}
            {error && (
                <div className="bg-surface text-destructive-foreground absolute inset-0 flex items-center justify-center p-1 text-center text-sm">
                    {error}
                </div>
            )}
        </div>
    );
}

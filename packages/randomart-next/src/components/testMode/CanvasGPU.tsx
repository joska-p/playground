import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

import { buildValueFragmentShader } from './buildValueShader';

import type { Node } from '@repo/randomart-engine-next/types';

interface CanvasGPUProps {
    node: Node;
    sizePx: number;
}

function buildShader(node: Node): { shader: string | null; error: string | null } {
    try {
        return { shader: buildValueFragmentShader(node), error: null };
    } catch (e) {
        return {
            shader: null,
            error: e instanceof Error ? e.message : 'GLSL build error'
        };
    }
}

export function CanvasGPU({ node, sizePx }: CanvasGPUProps) {
    const { shader, error } = buildShader(node);

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

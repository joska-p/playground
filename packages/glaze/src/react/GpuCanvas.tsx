import { useEffect, useRef, type CSSProperties } from 'react';
import type { GpuDraw, GpuSurface } from '../gpu/GpuSurface';
import type { Program } from '../gpu/shader/Program';
import type { UniformValue } from '../gpu/shader/compileProgram';
import { useGpuSurface, type GpuSurfaceOptions } from './useGpuSurface';
import { createInteractionAdapter, type CanvasInteractions } from './interactions';

export interface GpuCanvasProps extends GpuSurfaceOptions {
    /** Compiled on mount and recompiled on change. */
    fragmentShader?: string;
    /** Computed from the surface before each frame's draw. */
    uniforms?: (surface: GpuSurface) => Record<string, UniformValue>;
    onDraw?: GpuDraw;
    onSurface?: (surface: GpuSurface) => void;
    canvasInteractions?: CanvasInteractions<GpuSurface>;
    className?: string;
    style?: CSSProperties;
}

export function GpuCanvas({
    fragmentShader,
    uniforms,
    onDraw,
    onSurface,
    canvasInteractions,
    className,
    style,
    ...surfaceOptions
}: GpuCanvasProps) {
    const { canvasRef, surfaceRef, gesturesRef } = useGpuSurface(surfaceOptions);
    const programRef = useRef<Program | null>(null);

    useEffect(() => {
        gesturesRef.current = createInteractionAdapter(canvasInteractions);
    }, [canvasInteractions, gesturesRef]);

    useEffect(() => {
        const surface = surfaceRef.current;
        if (!surface || !fragmentShader) return;

        const program = surface.createProgram(fragmentShader);
        programRef.current = program;

        return () => {
            program.destroy();
            programRef.current = null;
        };
    }, [fragmentShader, surfaceRef]);

    useEffect(() => {
        const surface = surfaceRef.current;
        if (!surface) return;

        onSurface?.(surface);

        const shouldDraw = onDraw !== undefined || fragmentShader !== undefined;
        const draw: GpuDraw = (frame) => {
            const program = programRef.current;
            if (program) {
                program.setUniforms(uniforms ? uniforms(frame) : {});
                frame.renderProgram(program);
            }
            onDraw?.(frame);
        };

        surface.setDraw(shouldDraw ? draw : null);
    }, [onDraw, uniforms, fragmentShader, onSurface, surfaceRef]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                touchAction: 'none',
                ...style
            }}
        />
    );
}

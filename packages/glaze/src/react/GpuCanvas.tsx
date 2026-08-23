import { useEffect, useRef, type CSSProperties } from 'react';

import { createInteractionAdapter, type CanvasInteractions } from './interactions';
import { createGpuStack, type GpuSurfaceOptions } from './surfaceStack';
import { useNodeResource } from './useNodeResource';

import type { ClockStore } from './clockStore';
import type { Gesture } from '../core/gestures';
import type { GpuDraw, GpuSurface } from '../gpu/GpuSurface';
import type { UniformValue } from '../gpu/shader/compileProgram';
import type { Program } from '../gpu/shader/Program';

export interface GpuCanvasProps extends GpuSurfaceOptions {
    /** Compiled on mount and recompiled whenever the source changes. */
    fragmentShader?: string;
    /** Computed from the surface before each frame's draw. */
    uniforms?: (surface: GpuSurface) => Record<string, UniformValue>;
    onFrame?: GpuDraw;
    /**
     * Called exactly once per `GpuSurface` instance, right after it's created — the right place for
     * one-time setup (`createProgram`, `createStateBuffer`, seeding simulation state).
     *
     * This guarantee holds regardless of how often the `onMount` callback itself changes identity
     * across renders: it is keyed to the surface, not to React's effect dependencies.
     */
    onMount?: (surface: GpuSurface) => void;
    /** Called once per `GpuSurface` instance, alongside `onMount`. */
    onClockStore?: (clockStore: ClockStore) => void;
    canvasInteractions?: CanvasInteractions<GpuSurface>;
    className?: string;
    style?: CSSProperties;
}

export function GpuCanvas({
    fragmentShader,
    uniforms,
    onFrame,
    onMount,
    onClockStore,
    canvasInteractions,
    className,
    style,
    ...surfaceOptions
}: GpuCanvasProps) {
    const gesturesRef = useRef<Gesture<GpuSurface>[]>([]);

    const { ref: canvasRef, resource: stack } = useNodeResource((canvas: HTMLCanvasElement) =>
        createGpuStack(canvas, surfaceOptions, () => gesturesRef.current)
    );
    const programRef = useRef<Program | null>(null);
    const mountedSurfaceRef = useRef<GpuSurface | null>(null);

    useEffect(() => {
        gesturesRef.current = createInteractionAdapter(canvasInteractions);
    }, [canvasInteractions, gesturesRef]);

    useEffect(() => {
        if (!stack || !fragmentShader) return;

        const program = stack.surface.createProgram(fragmentShader);

        programRef.current = program;

        return () => {
            program.destroy();
            programRef.current = null;
        };
    }, [fragmentShader, stack]);

    useEffect(() => {
        if (!stack || mountedSurfaceRef.current === stack.surface) return;

        mountedSurfaceRef.current = stack.surface;
        onMount?.(stack.surface);
        onClockStore?.(stack.clockStore);
    }, [onClockStore, onMount, stack]);

    useEffect(() => {
        if (!stack) return;

        const surface = stack.surface;
        const shouldDraw = onFrame !== undefined || fragmentShader !== undefined;
        const draw: GpuDraw = (frame) => {
            const program = programRef.current;

            if (program) {
                program.setUniforms(uniforms ? uniforms(frame) : {});
                frame.renderProgram(program);
            }

            onFrame?.(frame);
        };

        surface.setDraw(shouldDraw ? draw : null);
    }, [onFrame, uniforms, fragmentShader, stack]);

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

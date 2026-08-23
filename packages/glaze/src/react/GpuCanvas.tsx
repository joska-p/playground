import { useEffect, useRef, type CSSProperties } from 'react';

import { createInteractionAdapter, type CanvasInteractions } from './interactions';
import { useGpuSurface, type GpuSurfaceOptions, type ClockStore } from './useGpuSurface';

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
    const { canvasRef, surfaceRef, gesturesRef, clockStoreRef } = useGpuSurface(surfaceOptions);
    const programRef = useRef<Program | null>(null);
    // Tracks which surface instance has already received its one-time setup call.
    const mountedSurfaceRef = useRef<GpuSurface | null>(null);

    // --- Gestures: rebuilt whenever the interaction config changes. ---
    useEffect(() => {
        gesturesRef.current = createInteractionAdapter(canvasInteractions);
    }, [canvasInteractions, gesturesRef]);

    // --- Shader program: (re)compiled whenever the source changes, destroyed on cleanup. ---
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

    // --- One-time setup: fires exactly once per surface instance. ---
    // No dependency array: this runs after every render (cheap — it's a ref comparison), but it
    // only *acts* the first time it sees a given surface. This is what makes the one-shot
    // guarantee true by construction instead of by convention: it holds no matter what
    // `onMount`/`onClockStore` capture, and no matter how often they change identity.
    useEffect(() => {
        const surface = surfaceRef.current;

        if (!surface || mountedSurfaceRef.current === surface) return;

        mountedSurfaceRef.current = surface;
        onMount?.(surface);

        const clockStore = clockStoreRef.current;

        if (clockStore) onClockStore?.(clockStore);
    });

    // --- Per-frame draw wiring: swapped whenever the draw logic changes. ---
    useEffect(() => {
        const surface = surfaceRef.current;

        if (!surface) return;

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
    }, [onFrame, uniforms, fragmentShader, surfaceRef]);

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

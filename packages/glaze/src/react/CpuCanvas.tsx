import { useEffect, useRef, type CSSProperties } from 'react';

import { createInteractionAdapter, type CanvasInteractions } from './interactions';
import { useCpuSurface, type CpuSurfaceOptions } from './useCpuSurface';

import type { CpuDraw, CpuSurface } from '../cpu/CpuSurface';

export interface CpuCanvasProps extends CpuSurfaceOptions {
    onFrame?: CpuDraw;
    /**
     * Called exactly once per `CpuSurface` instance, right after it's created — the right place for
     * one-time setup.
     *
     * This guarantee holds regardless of how often the `onMount` callback itself changes identity
     * across renders: it is keyed to the surface, not to React's effect dependencies.
     */
    onMount?: (surface: CpuSurface) => void;
    canvasInteractions?: CanvasInteractions<CpuSurface>;
    className?: string;
    style?: CSSProperties;
}

export function CpuCanvas({
    onFrame,
    onMount,
    canvasInteractions,
    className,
    style,
    ...surfaceOptions
}: CpuCanvasProps) {
    const { canvasRef, surfaceRef, gesturesRef } = useCpuSurface(surfaceOptions);
    // Tracks which surface instance has already received its one-time setup call.
    const mountedSurfaceRef = useRef<CpuSurface | null>(null);

    // --- Gestures: rebuilt whenever the interaction config changes. ---
    useEffect(() => {
        gesturesRef.current = createInteractionAdapter(canvasInteractions);
    }, [canvasInteractions, gesturesRef]);

    // --- One-time setup: fires exactly once per surface instance. ---
    // No dependency array: this runs after every render (cheap — it's a ref comparison), but it
    // only *acts* the first time it sees a given surface, regardless of what triggers the re-run.
    useEffect(() => {
        const surface = surfaceRef.current;

        if (!surface || mountedSurfaceRef.current === surface) return;

        mountedSurfaceRef.current = surface;
        onMount?.(surface);
    });

    // --- Per-frame draw wiring: swapped whenever the draw logic changes. ---
    useEffect(() => {
        const surface = surfaceRef.current;

        if (!surface) return;

        surface.setDraw(onFrame ?? null);
    }, [onFrame, surfaceRef]);

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

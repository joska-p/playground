import { useEffect, useRef, type CSSProperties } from 'react';

import { createInteractionAdapter } from './interactions';
import { createCpuStack, type CpuSurfaceOptions } from './surfaceStack';
import { useNodeResource } from './useNodeResource';

import type { CanvasInteractions } from './interactions';
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
    const gestures = createInteractionAdapter(canvasInteractions);
    const gesturesRef = useRef(gestures);

    const { ref: canvasRef, resource: stack } = useNodeResource((canvas: HTMLCanvasElement) =>
        createCpuStack(canvas, surfaceOptions, () => gesturesRef.current)
    );

    // ── Mount Effect ──
    const mountedSurfaceRef = useRef<CpuSurface | null>(null);

    useEffect(() => {
        if (!stack || mountedSurfaceRef.current === stack.surface) return;

        mountedSurfaceRef.current = stack.surface;
        onMount?.(stack.surface);
    }, [onMount, stack]);

    // ── Frame Loop Effect ──
    useEffect(() => {
        if (!stack || !onFrame) return;

        return stack.surface.onFrame(onFrame);
    }, [onFrame, stack]);

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

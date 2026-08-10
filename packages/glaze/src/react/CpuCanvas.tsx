// components/CpuCanvas.tsx
import { useEffect, type CSSProperties } from 'react';
import type { CpuDraw, CpuSurface } from '../cpu/CpuSurface';
import { useCpuSurface, type CpuSurfaceOptions } from './useCpuSurface';
import { createInteractionAdapter, type CanvasInteractions } from './interactions';

export type CpuCanvasProps = CpuSurfaceOptions & {
    onDraw?: CpuDraw;
    onSurface?: (surface: CpuSurface) => void;
    canvasInteractions?: CanvasInteractions<CpuSurface>;
    className?: string;
    style?: CSSProperties;
};

export function CpuCanvas({
    onDraw,
    onSurface,
    canvasInteractions,
    className,
    style,
    ...surfaceOptions
}: CpuCanvasProps) {
    const { canvasRef, surfaceRef, gesturesRef } = useCpuSurface(surfaceOptions);

    // Sync interactions cleanly by updating the ref
    useEffect(() => {
        gesturesRef.current = createInteractionAdapter(canvasInteractions);
    }, [canvasInteractions, gesturesRef]);

    // Sync draw callbacks and pass surface reference
    useEffect(() => {
        const surface = surfaceRef.current;
        if (!surface) return;

        onSurface?.(surface);
        surface.setDraw(onDraw ?? null);
    }, [onDraw, onSurface, surfaceRef]);

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

import { useEffect, type CSSProperties } from 'react';

import { createInteractionAdapter, type CanvasInteractions } from './interactions';
import { useCpuSurface, type CpuSurfaceOptions } from './useCpuSurface';

import type { CpuDraw, CpuSurface } from '../cpu/CpuSurface';

export interface CpuCanvasProps extends CpuSurfaceOptions {
    onDraw?: CpuDraw;
    onSurface?: (surface: CpuSurface) => void;
    canvasInteractions?: CanvasInteractions<CpuSurface>;
    className?: string;
    style?: CSSProperties;
}

export function CpuCanvas({
    onDraw,
    onSurface,
    canvasInteractions,
    className,
    style,
    ...surfaceOptions
}: CpuCanvasProps) {
    const { canvasRef, surfaceRef, gesturesRef } = useCpuSurface(surfaceOptions);

    useEffect(() => {
        gesturesRef.current = createInteractionAdapter(canvasInteractions);
    }, [canvasInteractions, gesturesRef]);

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

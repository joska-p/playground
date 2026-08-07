import { useEffect, useRef } from 'react';
import { createSurface } from '@repo/glaze/cpu/createSurface';
import { drawSceneCpu } from '../scene';

export function SurfaceCpuImperative() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const surface = createSurface({ canvas });
        surface.setDraw(() => {
            drawSceneCpu(surface);
        });
        return () => {
            surface.destroy();
        };
    }, []);

    return (
        <div className="h-75 w-100">
            <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ display: 'block' }}
            />
        </div>
    );
}

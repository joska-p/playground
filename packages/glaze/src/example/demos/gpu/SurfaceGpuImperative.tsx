import { useEffect, useRef } from 'react';
import { createGpuSurface } from '../../../gpu/createGpuSurface';
import { drawSceneGpu } from '../scene';

export function SurfaceGpuImperative() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const surface = createGpuSurface({ canvas });
        surface.setDraw(() => {
            drawSceneGpu(surface);
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

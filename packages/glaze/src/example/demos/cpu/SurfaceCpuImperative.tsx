import { useEffect, useRef } from 'react';
import { createCpuSurface } from '../../../cpu/createCpuSurface';
import { drawSceneCpu } from '../scene';

export function SurfaceCpuImperative() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const surface = createCpuSurface({ canvas });
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

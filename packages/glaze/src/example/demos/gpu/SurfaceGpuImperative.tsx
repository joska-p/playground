import { useEffect, useRef } from 'react';
import { createGpuRuntime } from '../../../gpu/createGpuRuntime';
import { drawSceneGpu } from '../scene';

export function SurfaceGpuImperative() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const runtime = createGpuRuntime({ canvas });
        runtime.setDraw(() => {
            drawSceneGpu(runtime);
        });
        return () => {
            runtime.destroy();
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

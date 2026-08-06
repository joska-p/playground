import { useEffect, useRef } from 'react';
import { createCpuRuntime } from '@repo/glaze/cpu/createCpuRuntime';
import { drawSceneCpu } from '../scene';

export function SurfaceCpuImperative() {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const runtime = createCpuRuntime({ canvas });
                runtime.setDraw(() => {
                        drawSceneCpu(runtime);
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

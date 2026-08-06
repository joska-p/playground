import { useEffect, useRef } from 'react';
import { createGpuRuntime } from '@repo/glaze/gpu/createGpuRuntime';
import { plasmaFragmentSource } from '../shaders';

export function ProgramGpuImperative() {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const runtime = createGpuRuntime({ canvas });
                const plasma = runtime.createProgram(plasmaFragmentSource);
                const unsubscribe = runtime.subscribe(() => {
                        runtime.clear(0, 0, 0, 1);
                        runtime.renderProgram(plasma);
                });
                return () => {
                        unsubscribe();
                        plasma.destroy();
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

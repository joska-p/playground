import { useEffect, useRef } from 'react';
import { createGpuSurface } from '../../../gpu/createGpuSurface';
import plasmaFragmentSource from '../shaders.glsl?raw';

export function ProgramGpuImperative() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const surface = createGpuSurface({ canvas });
        const plasma = surface.createProgram(plasmaFragmentSource);
        const unsubscribe = surface.subscribe(() => {
            surface.clear(0, 0, 0, 1);
            surface.renderProgram(plasma);
        });
        return () => {
            unsubscribe();
            plasma.destroy();
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

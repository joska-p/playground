import { useRef, useState } from 'react';
import type { CpuDraw, Surface } from '@repo/glaze/cpu/createSurface';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import type { Point2D } from '@repo/glaze/core/coords/camera';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { useCamera } from '@repo/glaze/react/useCamera';
import { useFrame } from '@repo/glaze/react/useFrame';

const CENTER: Point2D = { x: 200, y: 150 };
const ORBIT = 90;
const RADIUS = 24;
const SPEED = 8;

export function SurfaceCpuHybrid() {
    const [surface, setSurface] = useState<Surface | null>(null);
    const [camera, controls] = useCamera({ zoom: 1 });
    const phaseRef = useRef(0);

    useFrame((time) => {
        phaseRef.current = time * SPEED;
    });

    const onFrame: CpuDraw = () => {
        if (!surface) return;
        const position: Point2D = {
            x: CENTER.x + ORBIT * Math.cos(phaseRef.current),
            y: CENTER.y + ORBIT * Math.sin(phaseRef.current)
        };
        surface.clear('#0f172a');
        surface.applyCamera();
        drawCircle(surface.context, { fill: '#e11d48' }, position, RADIUS);
        drawCircle(surface.context, { fill: '#38bdf8' }, CENTER, 5);
    };

    return (
        <div className="h-75 w-100">
            <CpuCanvas
                onSurface={setSurface}
                onFrame={onFrame}
                camera={camera}
                cameraControls={controls}
                className="h-full w-full"
            />
        </div>
    );
}

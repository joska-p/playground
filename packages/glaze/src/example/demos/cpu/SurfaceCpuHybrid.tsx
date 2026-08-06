import { useRef, useState } from 'react';
import type { CpuDraw, CpuRuntime } from '@repo/glaze/cpu/createCpuRuntime';
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
        const [runtime, setRuntime] = useState<CpuRuntime | null>(null);
        const [camera, controls] = useCamera({ zoom: 1 });
        const phaseRef = useRef(0);

        useFrame((time) => {
                phaseRef.current = time * SPEED;
        });

        const onFrame: CpuDraw = () => {
                if (!runtime) return;
                const position: Point2D = {
                        x: CENTER.x + ORBIT * Math.cos(phaseRef.current),
                        y: CENTER.y + ORBIT * Math.sin(phaseRef.current)
                };
                runtime.clear('#0f172a');
                runtime.applyCamera();
                drawCircle(runtime.context, { fill: '#e11d48' }, position, RADIUS);
                drawCircle(runtime.context, { fill: '#38bdf8' }, CENTER, 5);
        };

        return (
                <div className="h-75 w-100">
                        <CpuCanvas
                                onRuntime={setRuntime}
                                onFrame={onFrame}
                                camera={camera}
                                cameraControls={controls}
                                className="h-full w-full"
                        />
                </div>
        );
}

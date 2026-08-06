import { useRef, useState } from 'react';
import type { GpuDraw, GpuRuntime } from '@repo/glaze/gpu/createGpuRuntime';
import type { Point2D } from '@repo/glaze/core/coords/camera';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import { useCamera } from '@repo/glaze/react/useCamera';
import { useFrame } from '@repo/glaze/react/useFrame';
import { drawSceneGpu } from '../scene';

export function SurfaceGpuHybrid() {
    const [runtime, setRuntime] = useState<GpuRuntime | null>(null);
    const [camera, controls] = useCamera({ zoom: 1 });
    const hoverRef = useRef<Point2D | null>(null);
    const phaseRef = useRef(0);

    useFrame((time) => {
        phaseRef.current = time * 3;
    });

    const onFrame: GpuDraw = () => {
        if (!runtime) return;
        drawSceneGpu(runtime);
        const hover = hoverRef.current;
        if (hover) {
            const radius = 22 + Math.sin(phaseRef.current) * 6;
            runtime.drawCircle(hover, radius, { stroke: '#facc15', lineWidth: 3 });
        }
    };

    return (
        <div className="h-75 w-100">
            <GpuCanvas
                onRuntime={setRuntime}
                onFrame={onFrame}
                camera={camera}
                cameraControls={controls}
                pointerHandlers={{
                    onPointerMove: (_event, ctx) => {
                        if (!ctx.input) return;
                        hoverRef.current = ctx.input.getPointerWorldPos(ctx.camera);
                    }
                }}
                className="h-full w-full"
            />
        </div>
    );
}

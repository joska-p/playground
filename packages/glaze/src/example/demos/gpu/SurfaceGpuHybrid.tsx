import { useRef } from 'react';
import type { GpuDraw } from '../../../gpu/createGpuSurface';
import type { Point2D } from '../../../core/coords/camera';
import { GpuCanvas } from '../../../react/GpuCanvas';
import { useCamera } from '../../../react/useCamera';
import { useFrame } from '../../../react/useFrame';
import { drawSceneGpu } from '../scene';

export function SurfaceGpuHybrid() {
    const [camera, controls] = useCamera({ zoom: 1 });
    const hoverRef = useRef<Point2D | null>(null);
    const phaseRef = useRef(0);

    useFrame((time) => {
        phaseRef.current = time * 3;
    });

    const onFrame: GpuDraw = (context) => {
        const { surface } = context;
        drawSceneGpu(surface);
        const hover = hoverRef.current;
        if (hover) {
            const radius = 22 + Math.sin(phaseRef.current) * 6;
            surface.drawCircle(hover, radius, { stroke: '#facc15', lineWidth: 3 });
        }
    };

    return (
        <div className="h-75 w-100">
            <GpuCanvas
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

import { useState } from 'react';
import type { GpuRuntime, GpuDraw } from '@repo/glaze/gpu/createGpuRuntime';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import { verifyGpuShapes } from '../proof/gpuProbe';
import { stashProof } from '../proof/types';
import { SCENE } from './scene';

export function SurfaceGpu() {
        const [runtime, setRuntime] = useState<GpuRuntime | null>(null);

        const onFrame: GpuDraw = (ctx) => {
                if (!runtime) return;
                runtime.clear(SCENE.bgGpu[0], SCENE.bgGpu[1], SCENE.bgGpu[2], 1);
                runtime.drawCircle(SCENE.circle.center, SCENE.circle.radius, {
                        fill: SCENE.circle.fill
                });
                runtime.drawRect(
                        { x: SCENE.rect.x, y: SCENE.rect.y, w: SCENE.rect.w, h: SCENE.rect.h },
                        { fill: SCENE.rect.fill }
                );
                runtime.drawLine(SCENE.line.a, SCENE.line.b, {
                        stroke: SCENE.line.stroke,
                        lineWidth: SCENE.line.lineWidth
                });
                runtime.drawText(SCENE.text.text, SCENE.text.position, {
                        fill: SCENE.text.fill,
                        fontSize: SCENE.text.fontSize
                });
                if (ctx.frameCount === 3) {
                        stashProof('surfaceGpu', verifyGpuShapes(runtime, ctx.height, ctx.dpr));
                }
        };

        return (
                <div className="h-75 w-100">
                        <GpuCanvas
                                onRuntime={setRuntime}
                                onFrame={onFrame}
                                className="h-full w-full"
                        />
                </div>
        );
}

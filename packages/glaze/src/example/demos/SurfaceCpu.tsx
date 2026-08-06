import { useState } from 'react';
import type { CpuRuntime, CpuDraw } from '@repo/glaze/cpu/createCpuRuntime';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import { drawLine } from '@repo/glaze/cpu/shapes/line';
import { drawRect } from '@repo/glaze/cpu/shapes/rect';
import { drawText } from '@repo/glaze/cpu/shapes/text';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { verifyCpuShapes } from '../proof/cpuProbe';
import { stashProof } from '../proof/types';
import { SCENE } from './scene';

export function SurfaceCpu() {
        const [runtime, setRuntime] = useState<CpuRuntime | null>(null);

        const onFrame: CpuDraw = (ctx) => {
                if (!runtime) return;
                runtime.clear(SCENE.bg);
                runtime.applyCamera();
                drawCircle(
                        runtime.context,
                        { fill: SCENE.circle.fill },
                        SCENE.circle.center,
                        SCENE.circle.radius
                );
                drawRect(
                        runtime.context,
                        { fill: SCENE.rect.fill },
                        { x: SCENE.rect.x, y: SCENE.rect.y, w: SCENE.rect.w, h: SCENE.rect.h }
                );
                drawLine(
                        runtime.context,
                        { stroke: SCENE.line.stroke, lineWidth: SCENE.line.lineWidth },
                        SCENE.line.a,
                        SCENE.line.b
                );
                drawText(
                        runtime.context,
                        { fill: SCENE.text.fill, fontSize: SCENE.text.fontSize },
                        SCENE.text.text,
                        SCENE.text.position
                );
                if (ctx.frameCount === 3) {
                        stashProof('surfaceCpu', verifyCpuShapes(runtime, ctx.dpr));
                }
        };

        return (
                <div className="h-[300px] w-[400px]">
                        <CpuCanvas
                                onRuntime={setRuntime}
                                onFrame={onFrame}
                                className="h-full w-full"
                        />
                </div>
        );
}

import { useState } from 'react';
import type { GpuDraw, GpuRuntime } from '../../../gpu/createGpuRuntime';
import { GpuCanvas } from '../../../react/GpuCanvas';
import { drawSceneGpu } from '../scene';

export function SurfaceGpuDeclarative() {
    const [runtime, setRuntime] = useState<GpuRuntime | null>(null);

    const onFrame: GpuDraw = () => {
        if (!runtime) return;
        drawSceneGpu(runtime);
    };

    return (
        <div className="h-75 w-100">
            <GpuCanvas
                pan={true}
                zoom={true}
                onSurface={setRuntime}
                onFrame={onFrame}
                className="h-full w-full"
            />
        </div>
    );
}

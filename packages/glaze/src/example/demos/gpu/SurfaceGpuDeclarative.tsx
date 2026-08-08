import type { GpuDraw } from '../../../gpu/createGpuSurface';
import { GpuCanvas } from '../../../react/GpuCanvas';
import { drawSceneGpu } from '../scene';

export function SurfaceGpuDeclarative() {
    const onFrame: GpuDraw = (context) => {
        const { surface } = context;
        drawSceneGpu(surface);
    };

    return (
        <div className="h-75 w-100">
            <GpuCanvas
                pan={true}
                zoom={true}
                onFrame={onFrame}
                className="h-full w-full"
            />
        </div>
    );
}

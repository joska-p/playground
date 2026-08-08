import type { CpuDraw } from '../../../cpu/createCpuSurface';
import { CpuCanvas } from '../../../react/CpuCanvas';
import { drawSceneCpu } from '../scene';

export function SurfaceCpuDeclarative() {
    const onFrame: CpuDraw = (context) => {
        drawSceneCpu(context.surface);
    };

    return (
        <div className="h-75 w-100">
            <CpuCanvas
                onFrame={onFrame}
                className="h-full w-full"
            />
        </div>
    );
}

import { useState } from 'react';
import type { CpuDraw, CpuRuntime } from '@repo/glaze/cpu/createCpuRuntime';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { drawSceneCpu } from '../scene';

export function SurfaceCpuDeclarative() {
        const [runtime, setRuntime] = useState<CpuRuntime | null>(null);

        const onFrame: CpuDraw = () => {
                if (!runtime) return;
                drawSceneCpu(runtime);
        };

        return (
                <div className="h-75 w-100">
                        <CpuCanvas
                                onRuntime={setRuntime}
                                onFrame={onFrame}
                                className="h-full w-full"
                        />
                </div>
        );
}

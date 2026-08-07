import { useState } from 'react';
import type { CpuDraw, Surface } from '@repo/glaze/cpu/createSurface';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { drawSceneCpu } from '../scene';

export function SurfaceCpuDeclarative() {
    const [surface, setSurface] = useState<Surface | null>(null);

    const onFrame: CpuDraw = () => {
        if (!surface) return;
        drawSceneCpu(surface);
    };

    return (
        <div className="h-75 w-100">
            <CpuCanvas
                onSurface={setSurface}
                onFrame={onFrame}
                className="h-full w-full"
            />
        </div>
    );
}

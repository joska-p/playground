import { useState } from 'react';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { Surface } from '@repo/glaze/cpu/createSurface';

import { getModule } from '../core/registry'; // your package
import { identity } from '../middle/identity';
import { createPolylineViz } from '../viz/polyline';

export function NaturalsDemo() {
    const [runtime, setRuntime] = useState<Surface | null>(null);

    const module = getModule('naturals');
    const signal = module.createSignal({ maxTerms: 200 });
    const processed = identity(signal); // middleware does nothing yet
    const viz = createPolylineViz({
        maxTerms: 80,
        xSpacing: 14,
        yScale: 0.8,
        color: '#38bdf8'
    });

    return (
        <CpuCanvas
            style={{ width: '100%', height: 400, background: '#0d1015' }}
            onRuntime={setRuntime}
            onFrame={(frame) => {
                if (!runtime) return;
                runtime.clear('#0d1015');

                viz.render(processed, runtime, {
                    width: frame.width,
                    height: frame.height,
                    time: frame.time
                });
            }}
        />
    );
}

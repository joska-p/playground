import { useState } from 'react';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuSurface } from '@repo/glaze/cpu/createCpuSurface';

import { getModule } from '../core/registry';
import { identity } from '../middle/identity';
import { createPolylineViz } from '../viz/polyline';

export function NaturalsDemo() {
    const [surface, setSurface] = useState<CpuSurface | null>(null);

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
            onSurface={setSurface}
            onFrame={(frame) => {
                if (!surface) return;
                surface.clear('#0d1015');

                viz.render(processed, surface, {
                    width: frame.width,
                    height: frame.height,
                    time: frame.time
                });
            }}
        />
    );
}

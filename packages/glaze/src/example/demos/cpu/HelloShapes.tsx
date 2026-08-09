import type { CpuDraw } from '../../../cpu/CpuSurface';
import { CpuCanvas } from '../../../react/CpuCanvas';

export const helloShapesSnippet = `import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuDraw } from '@repo/glaze/cpu/CpuSurface';

function RadarSketch() {
    const onFrame: CpuDraw = (surface) => {
        const cx = 200, cy = 150; // Center coordinates
        const t = surface.time;

        surface
            .clear('#0b0f19') // Deep space background
            
            // Outer radar boundary & grid crosshairs
            .circle(cx, cy, 110, '#1e293b', '#1e293b', 2)
            .line(cx - 120, cy, cx + 120, cy, '#1e293b', 1)
            .line(cx, cy - 120, cx, cy + 120, '#1e293b', 1)
            
            // The Sun / Core (pulses slightly over time)
            .circle(cx, cy, 40 + Math.sin(t * 4) * 3, '#f43f5e')
            
            // Sweeping radar arm line
            .line(
                cx, 
                cy, 
                cx + 110 * Math.cos(t * 2), 
                cy + 110 * Math.sin(t * 2), 
                '#10b981', 
                2
            )
            
            // Orbiting Moon / Satellite
            .circle(
                cx + 80 * Math.cos(-t * 1.5),
                cy + 80 * Math.sin(-t * 1.5),
                6,
                '#38bdf8'
            )
            
            // Telemetry UI Text
            .text('SYSTEM: ACTIVE', 30, 40, '#10b981', 12)
            .text(\`T+\${t.toFixed(1)}s\`, 30, 60, '#64748b', 12);
    };

    return <CpuCanvas onFrame={onFrame} className="h-full w-full" />;
}
`;

export function HelloShapes() {
    const onFrame: CpuDraw = (surface) => {
        const cx = 200,
            cy = 150;
        const t = surface.time;

        surface
            .clear('#0b0f19')
            .circle(cx, cy, 110, '#1e293b', '#1e293b', 2)
            .line(cx - 120, cy, cx + 120, cy, '#1e293b', 1)
            .line(cx, cy - 120, cx, cy + 120, '#1e293b', 1)
            .circle(cx, cy, 40 + Math.sin(t * 4) * 3, '#f43f5e')
            .line(cx, cy, cx + 110 * Math.cos(t * 2), cy + 110 * Math.sin(t * 2), '#10b981', 2)
            .circle(cx + 80 * Math.cos(-t * 1.5), cy + 80 * Math.sin(-t * 1.5), 6, '#38bdf8')
            .text('SYSTEM: ACTIVE', 30, 40, '#10b981', 12)
            .text(`T+${t.toFixed(1)}s`, 30, 60, '#64748b', 12);
    };

    return (
        <CpuCanvas
            onFrame={onFrame}
            className="h-full w-full"
        />
    );
}

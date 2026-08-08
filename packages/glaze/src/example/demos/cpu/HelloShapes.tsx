import type { CpuDraw, CpuSurface } from '../../../cpu/createCpuSurface';
import { CpuCanvas } from '../../../react/CpuCanvas';

const SUN = { x: 200, y: 150 };
const ORBIT = 105;
const MOON_RADIUS = 6;
const SPEED = 1.5;

export const helloShapesSnippet = `import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuDraw, CpuSurface } from '@repo/glaze/cpu/createCpuSurface';

function Sketch() {
    // onSurface: the surface exists — draw the static scene once.
    const onSurface = (surface: CpuSurface | null) => {
        if (!surface) return;
        surface
            .clear('#0d1117')
            .rect(30, 30, 120, 90, '#16a34a')
            .circle(200, 150, 60, '#e11d48')
            .line(30, 260, 200, 260, '#3b82f6', 8)
            .text('RENDER', 220, 80, '#f8fafc', 28);
    };

    // onFrame is shorthand for surface.setDraw(draw) — the same callback, registered imperatively.
    // onFrame runs every frame — animate with surface.time. No clear, so the moon paints its orbit.
    const onFrame: CpuDraw = (surface) => {
        surface.circle(
            200 + 105 * Math.cos(surface.time * 1.5),
            150 + 105 * Math.sin(surface.time * 1.5),
            6,
            '#38bdf8'
        );
    };

    return <CpuCanvas onSurface={onSurface} onFrame={onFrame} pan={false} zoom={false} />;
}`;

export function HelloShapes() {
    const onSurface = (surface: CpuSurface | null) => {
        if (!surface) return;
        surface
            .clear('#0d1117')
            .rect(30, 30, 120, 90, '#16a34a')
            .circle(SUN.x, SUN.y, 60, '#e11d48')
            .line(30, 260, 200, 260, '#3b82f6', 8)
            .text('RENDER', 220, 80, '#f8fafc', 28);
    };

    const onFrame: CpuDraw = (surface) => {
        surface.circle(
            SUN.x + ORBIT * Math.cos(surface.time * SPEED),
            SUN.y + ORBIT * Math.sin(surface.time * SPEED),
            MOON_RADIUS,
            '#38bdf8'
        );
    };

    return (
        <CpuCanvas
            onSurface={onSurface}
            onFrame={onFrame}
            pan={false}
            zoom={false}
            className="h-full w-full"
        />
    );
}

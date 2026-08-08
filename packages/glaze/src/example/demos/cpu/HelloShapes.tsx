import type { CpuDraw, CpuSurface } from '../../../cpu/createCpuSurface';
import { CpuCanvas } from '../../../react/CpuCanvas';
import { drawCircle } from '../../../cpu/shapes/circle';
import { drawLine } from '../../../cpu/shapes/line';
import { drawRect } from '../../../cpu/shapes/rect';
import { drawText } from '../../../cpu/shapes/text';

const SUN = { x: 200, y: 150 };
const ORBIT = 105;
const MOON_RADIUS = 6;
const SPEED = 1.5;

export const helloShapesSnippet = `import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuDraw, CpuSurface } from '@repo/glaze/cpu/createCpuSurface';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import { drawRect } from '@repo/glaze/cpu/shapes/rect';
import { drawLine } from '@repo/glaze/cpu/shapes/line';
import { drawText } from '@repo/glaze/cpu/shapes/text';

function Sketch() {
    // onSurface: the surface exists — draw the static scene once.
    const onSurface = (surface: CpuSurface | null) => {
        if (!surface) return;
        surface.clear('#0d1117');
        drawCircle(surface.context, { fill: '#e11d48' }, { x: 200, y: 150 }, 60);
        drawRect(surface.context, { fill: '#16a34a' }, { x: 30, y: 30, w: 120, h: 90 });
        drawLine(surface.context, { stroke: '#3b82f6', lineWidth: 8 }, { x: 30, y: 260 }, { x: 200, y: 260 });
        drawText(surface.context, { fill: '#f8fafc', fontSize: 28 }, 'RENDER', { x: 220, y: 80 });
    };

    // onFrame is shorthand for surface.setDraw(draw) — the same callback, registered imperatively.
    // onFrame runs every frame — animate with surface.time. No clear, so the moon paints its orbit.
    const onFrame: CpuDraw = (surface) => {
        drawCircle(
            surface.context,
            { fill: '#38bdf8' },
            {
                x: 200 + 105 * Math.cos(surface.time * 1.5),
                y: 150 + 105 * Math.sin(surface.time * 1.5)
            },
            6
        );
    };

    return <CpuCanvas onSurface={onSurface} onFrame={onFrame} pan={false} zoom={false} />;
}`;

export function HelloShapes() {
    const onSurface = (surface: CpuSurface | null) => {
        if (!surface) return;
        surface.clear('#0d1117');
        drawCircle(surface.context, { fill: '#e11d48' }, SUN, 60);
        drawRect(surface.context, { fill: '#16a34a' }, { x: 30, y: 30, w: 120, h: 90 });
        drawLine(
            surface.context,
            { stroke: '#3b82f6', lineWidth: 8 },
            { x: 30, y: 260 },
            { x: 200, y: 260 }
        );
        drawText(surface.context, { fill: '#f8fafc', fontSize: 28 }, 'RENDER', { x: 220, y: 80 });
    };

    const onFrame: CpuDraw = (surface) => {
        drawCircle(
            surface.context,
            { fill: '#38bdf8' },
            {
                x: SUN.x + ORBIT * Math.cos(surface.time * SPEED),
                y: SUN.y + ORBIT * Math.sin(surface.time * SPEED)
            },
            MOON_RADIUS
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

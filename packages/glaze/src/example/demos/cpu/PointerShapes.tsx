import type { CpuSurface } from '../../../cpu/createCpuSurface';
import type { PointerHandler } from '../../../react/actions';
import { CpuCanvas } from '../../../react/CpuCanvas';

const RADIUS = 12;
const BACKGROUND = '#0d1117';
const FILL = '#38bdf8';

export const pointerShapesSnippet = `import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuSurface } from '@repo/glaze/cpu/createCpuSurface';
import type { PointerHandler } from '@repo/glaze/react/actions';

const RADIUS = 12;
const BACKGROUND = '#0d1117';
const FILL = '#38bdf8';

function Sketch() {
    // The handler receives the surface itself: left-click draws a circle,
    // right-click clears. Everything else hangs off the surface — input, camera, ...
    const onPointerDown: PointerHandler<CpuSurface> = (event, surface) => {
        if (event.button === 2) {
            surface.clear(BACKGROUND);
            return true;
        }
        if (event.button !== 0) return false;
        const p = surface.input.getPointerWorldPos(surface.camera);
        surface.circle(p.x, p.y, RADIUS, FILL);
        return true;
    };

    return (
        <CpuCanvas
            pan={false}
            zoom={false}
            pointerHandlers={{ onPointerDown }}
            onFrame={() => {
                // never clears, so the circles placed by clicks stay on the canvas
            }}
        />
    );
}`;

export function PointerShapes() {
    const onPointerDown: PointerHandler<CpuSurface> = (event, surface) => {
        if (event.button === 2) {
            surface.clear(BACKGROUND);
            return true;
        }
        if (event.button !== 0) return false;
        const p = surface.input.getPointerWorldPos(surface.camera);
        surface.circle(p.x, p.y, RADIUS, FILL);
        return true;
    };

    return (
        <CpuCanvas
            className="h-full w-full"
            pan={false}
            zoom={false}
            pointerHandlers={{ onPointerDown }}
            onFrame={() => {
                // never clears, so the circles placed by clicks stay on the canvas
            }}
        />
    );
}

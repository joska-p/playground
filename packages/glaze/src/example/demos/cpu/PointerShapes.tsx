import type { CpuSurface } from '../../../cpu/createCpuSurface';
import type { InteractionEvent } from '../../../react/actions';
import { CpuCanvas } from '../../../react/CpuCanvas';

const RADIUS = 12;
const BACKGROUND = '#0d1117';
const FILL = '#38bdf8';

export const pointerShapesSnippet = `import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuSurface } from '@repo/glaze/cpu/createCpuSurface';
import type { InteractionEvent } from '@repo/glaze/react/actions';

const RADIUS = 12;
const BACKGROUND = '#0d1117';
const FILL = '#38bdf8';

function Sketch() {
    // onStart receives the interaction block: native event, screen point, input
    // store, camera controls, and the surface. Left-click draws a circle,
    // right-click clears. surface.input.getPointerWorldPos(surface.camera) maps
    // the cursor into world space, and the builtin surface.circle paints it.
    const onStart = ({ nativeEvent, surface }: InteractionEvent<PointerEvent, CpuSurface>) => {
        if (!surface) return false;
        if (nativeEvent.button === 2) {
            surface.clear(BACKGROUND);
            return true;
        }
        if (nativeEvent.button !== 0) return false;
        const p = surface.input.getPointerWorldPos(surface.camera);
        surface.circle(p.x, p.y, RADIUS, FILL);
        return true;
    };

    return (
        <CpuCanvas
            interactions={{
                pan: false,
                zoom: false,
                onStart
            }}
            onFrame={() => {
                // never clears, so the circles placed by clicks stay on the canvas
            }}
        />
    );
}`;

export function PointerShapes() {
    const onStart = ({ nativeEvent, surface }: InteractionEvent<PointerEvent, CpuSurface>) => {
        if (!surface) return false;
        if (nativeEvent.button === 2) {
            surface.clear(BACKGROUND);
            return true;
        }
        if (nativeEvent.button !== 0) return false;
        const p = surface.input.getPointerWorldPos(surface.camera);
        surface.circle(p.x, p.y, RADIUS, FILL);
        return true;
    };

    return (
        <CpuCanvas
            className="h-full w-full"
            interactions={{
                pan: false,
                zoom: false,
                onStart
            }}
            onFrame={() => {
                // never clears, so the circles placed by clicks stay on the canvas
            }}
        />
    );
}

import type { CpuSurface } from '../../../cpu/CpuSurface';
import type { LiveInteractionEvent } from '../../../react/actions';
import { CpuCanvas } from '../../../react/CpuCanvas';

const RADIUS = 12;
const BACKGROUND = '#0d1117';
const FILL = '#38bdf8';

export const pointerShapesSnippet = `import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import type { CpuSurface } from '@repo/glaze/cpu/CpuSurface';
import type { LiveInteractionEvent } from '@repo/glaze/react/actions';

const RADIUS = 12;
const BACKGROUND = '#0d1117';
const FILL = '#38bdf8';

function Sketch() {
    const onStart = ({ nativeEvent, surface }: LiveInteractionEvent<PointerEvent, CpuSurface>) => {
        if (nativeEvent.button === 2) {
            surface.clear(BACKGROUND);
            return true;
        }
        if (nativeEvent.button !== 0) return false;
        const p = surface.pointer;
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
        />
    );
}`;

export function PointerShapes() {
    const onStart = ({ nativeEvent, surface }: LiveInteractionEvent<PointerEvent, CpuSurface>) => {
        if (nativeEvent.button === 2) {
            surface.clear(BACKGROUND);
            return true;
        }
        if (nativeEvent.button !== 0) return false;
        const p = surface.pointer;
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
        />
    );
}

import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import spiraleFragment from './spiraleFragment.glsl?raw';
import { useClock, useGap, setClockStore } from './store';

function Spirale() {
    const clock = useClock();
    const gap = useGap();

    return (
        <GpuCanvas
            className="h-full w-full"
            clock={clock}
            fragmentShader={spiraleFragment}
            uniforms={() => ({
                u_gap: gap
            })}
            onClockStore={setClockStore}
            canvasInteractions={{ pan: false, zoom: false }}
        />
    );
}

export { Spirale };

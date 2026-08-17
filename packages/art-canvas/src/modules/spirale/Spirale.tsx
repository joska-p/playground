import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import spiraleFragment from './spiraleFragment.glsl?raw';
import { useClock, useGap } from './store';

function Spirale() {
    const clock = useClock();
    const gap = useGap();


    return (
        <GpuCanvas
            className="h-full w-full"
            fragmentShader={spiraleFragment}
            uniforms={() => ({
                u_gap: gap
            })}
            onSurface={() => (clock)}
            canvasInteractions={{ pan: false, zoom: false }}
        />
    );
}

export { Spirale };

import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import spiraleFragment from './spiraleFragment.glsl?raw';
import { useIsPlaying, useGap } from './store';

function Spirale() {
    const isPlaying = useIsPlaying();
    const gap = useGap();

    return (
        <GpuCanvas
            className="h-full w-full"
            fragmentShader={spiraleFragment}
            uniforms={() => ({
                u_isPlaying: isPlaying,
                u_gap: gap
            })}
            canvasInteractions={{ pan: false, zoom: false }}
        />
    );
}

export { Spirale };

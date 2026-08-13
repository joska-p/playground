import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import spiraleFragment from './spiraleFragment.glsl?raw';
import { useIsPlaying } from './store';

function Spirale() {
    const isPlaying = useIsPlaying();

    return (
        <GpuCanvas
            className="h-full w-full"
            fragmentShader={spiraleFragment}
            uniforms={() => ({
                u_isPlaying: isPlaying
            })}
            canvasInteractions={{ pan: false, zoom: false }}
        />
    );
}

export { Spirale };

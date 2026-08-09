import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import { manual } from './manual';
import { useChroma, useDivisions, useLightness } from './store';

function Manual() {
    const divisions = useDivisions();
    const lightness = useLightness();
    const chroma = useChroma();

    return (
        <GpuCanvas
            className="h-full w-full"
            fragmentShader={manual.fragmentShader}
            uniforms={() => ({
                uDivisions: divisions,
                uLightness: lightness,
                uChroma: chroma
            })}
            interactions={{ pan: false, zoom: false }}
        />
    );
}

export { Manual };

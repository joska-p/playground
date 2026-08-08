import { GpuCanvas } from '../../../react/GpuCanvas';
import plasmaFragmentSource from '../shaders.glsl?raw';

export function ProgramGpuDeclarative() {
    return (
        <div className="h-75 w-100">
            <GpuCanvas
                fragmentShader={plasmaFragmentSource}
                className="h-full w-full"
            />
        </div>
    );
}

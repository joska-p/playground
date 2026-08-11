import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import fragmentShader from '../core/mandelbrot-original.glsl?raw';
import { fractalParamsUniforms } from '../core/fractalUniforms';
import { ZOOM_WHEEL_SPEED } from '../core/camera';
import { useParams } from '../stores/createParamStore';
import { originalStore } from '../stores/originalStore';

const MAX_ZOOM = 1e6;

function OriginalScene() {
    const params = useParams(originalStore);

    return (
        <div className="h-screen w-screen">
            <GpuCanvas
                className="h-full w-full"
                fragmentShader={fragmentShader}
                initialCamera={{ maxZoom: MAX_ZOOM }}
                canvasInteractions={{ zoom: { speed: ZOOM_WHEEL_SPEED } }}
                uniforms={({ camera: view, width, height }) => {
                    // Normalize the camera pan by zoom and canvas size into UV
                    // space. The shader applies u_panOffset after zoom, and a drag
                    // offset moves content opposite the cursor, so x is negated.
                    // The −0.5·drift terms pin the anchor to screenToWorld across zoom:
                    // the shader's (uv − 0.5) reference sits inside the /zoom divide.
                    const panNormX = view.x / view.zoom / width;
                    const panNormY = view.y / view.zoom / height;
                    const drift = 1.0 - 1.0 / view.zoom;
                    return {
                        u_panOffset: [-panNormX - 0.5 * drift, panNormY + 0.5 * drift],
                        ...fractalParamsUniforms(params)
                    };
                }}
            />
        </div>
    );
}

export { OriginalScene };

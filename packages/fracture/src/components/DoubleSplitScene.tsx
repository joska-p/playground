import { useEffect } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import fragmentShader from '../core/mandelbrot-double-split.glsl?raw';
import { splitDouble } from '../core/doubleSplit';
import { fractalParamsUniforms } from '../core/fractalUniforms';
import { useFractureView } from '../core/useFractureView';
import { useParams } from '../stores/createParamStore';
import { doubleSplitStore } from '../stores/doubleSplitStore';
import { setView, useRenderer, useViewPan, useViewZoom } from '../stores/viewStore';

const MAX_ZOOM = 1e11;

function DoubleSplitScene() {
    const params = useParams(doubleSplitStore);

    const renderer = useRenderer();
    const isActive = renderer === 'double-single';
    const pan = useViewPan();
    const zoom = useViewZoom();

    // Other renderers can zoom deeper than this one supports; clamp on activation.
    useEffect(() => {
        if (isActive && zoom > MAX_ZOOM) {
            setView({ pan, zoom: MAX_ZOOM });
        }
    }, [isActive, pan, zoom]);

    const { camera, controls, pointerHandlers, syncView } = useFractureView({
        initialView: { pan, zoom },
        maxZoom: MAX_ZOOM
    });

    return (
        <div className="h-screen w-screen">
            <GpuCanvas
                className="h-full w-full"
                fragmentShader={fragmentShader}
                camera={camera}
                cameraControls={controls}
                pointerHandlers={pointerHandlers}
                uniforms={({ camera: view, width, height }) => {
                    syncView();
                    // Map the interaction view onto the complex-plane center the shader
                    // expects. With the shader's convention
                    //   c = (uvCoord - 0.5) · (3 / zoom) + center
                    // the center is (−3·panNormX − 0.5, 3·panNormY), where panNorm is the
                    // pan offset normalized by the canvas size. pan is a drag offset, so it
                    // must move opposite the cursor (content-follows); y is flipped by the
                    // canvas→vUv conversion, so it enters positive.
                    const panNormX = view.x / view.zoom / width;
                    const panNormY = view.y / view.zoom / height;
                    const aspect = width / height;
                    // The −/+1.5·(1 − 1/zoom) terms pin the anchor to screenToWorld across
                    // zoom: the shader's (uvCoord − 0.5) reference lives inside the /zoom
                    // divide, which glaze's screenToWorld-based zoomAt does not compensate.
                    const drift = 1.0 - 1.0 / view.zoom;
                    const centerRe = -3.0 * aspect * panNormX - 0.5 - 1.5 * aspect * drift;
                    const centerIm = 3.0 * panNormY + 1.5 * drift;

                    // Split each float64 center component into a double-single (hi, lo)
                    // pair of float32s (~48 bits) before uploading, so the GPU can keep
                    // the center exact at zoom levels far beyond float32.
                    const [centerReHi, centerReLo] = splitDouble(centerRe);
                    const [centerImHi, centerImLo] = splitDouble(centerIm);

                    return {
                        u_centerRe: [centerReHi, centerReLo],
                        u_centerIm: [centerImHi, centerImLo],
                        ...fractalParamsUniforms(params)
                    };
                }}
            />
        </div>
    );
}

export { DoubleSplitScene };

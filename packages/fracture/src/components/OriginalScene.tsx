import { useEffect } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import fragmentShader from '../core/mandelbrot-original.glsl?raw';
import { fractalParamsUniforms } from '../core/fractalUniforms';
import { useFractureView } from '../core/useFractureView';
import { useParams } from '../stores/createParamStore';
import { originalStore } from '../stores/originalStore';
import { setView, useRenderer, useViewPan, useViewZoom } from '../stores/viewStore';

const MAX_ZOOM = 1e6;

function OriginalScene() {
    const params = useParams(originalStore);

    const renderer = useRenderer();
    const isActive = renderer === 'original';
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
        <GpuCanvas
            className="h-full w-full"
            fragmentShader={fragmentShader}
            camera={camera}
            cameraControls={controls}
            pointerHandlers={pointerHandlers}
            uniforms={({ camera: view, width, height }) => {
                syncView();
                // pan is stored zoom-normalized; normalize by canvas size into UV
                // space. The shader applies u_panOffset after zoom, and a drag
                // offset moves content opposite the cursor, so x is negated.
                const panNormX = view.x / view.zoom / width;
                const panNormY = view.y / view.zoom / height;
                return {
                    u_zoom: view.zoom,
                    u_panOffset: [-panNormX, panNormY],
                    ...fractalParamsUniforms(params)
                };
            }}
        />
    );
}

export { OriginalScene };

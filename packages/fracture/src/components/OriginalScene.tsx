import { useEffect } from 'react';
import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot-original.glsl?raw';
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

        return (
                <ShaderCanvas
                        fragmentShader={fragmentShader}
                        webGLContextAttributes={{ antialias: true }}
                        initialView={{ pan, zoom }}
                        maxZoom={MAX_ZOOM}
                        zoomToCursor
                        scalePanWithZoom
                        onViewChange={(view) => {
                                setView({ pan: view.pan, zoom: view.zoom });
                        }}
                        onBeforeRender={({ pipeline }) => {
                                pipeline.setUniforms({
                                        u_iterationBase: params.iterationBase,
                                        u_iterationScale: params.iterationScale,
                                        u_iterationCap: params.iterationCap,
                                        u_interiorScale: params.interiorScale,
                                        u_pixelEps: params.pixelEps,
                                        u_sunAngle: params.sunAngle,
                                        u_bumpHeight: params.bumpHeight,
                                        u_ambient: params.ambientLight,
                                        u_hueShift: params.hueShift,
                                        u_hueFrequency: params.hueFrequency,
                                        u_chromaScale: params.chromaScale
                                });
                        }}
                />
        );
}

export { OriginalScene };

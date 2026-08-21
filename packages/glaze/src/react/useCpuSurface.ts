import { useRef } from 'react';

import { Camera } from '../core/Camera';
import { createCameraControls, type CameraControls } from '../core/CameraControls';
import { InputRouter, type Gesture } from '../core/gestures';
import { createCpuSurface, type CpuSurface } from '../cpu/CpuSurface';

/** `initialCamera` only applies when no `camera` instance is provided. */
export interface CpuSurfaceOptions {
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: {
        zoom?: number;
        pan?: { x: number; y: number };
        minZoom?: number;
        maxZoom?: number;
    };
    dpr?: number;
}

/**
 * Manages a `CpuSurface` for a `<canvas>`: attach the returned `canvasRef`; the surface is created
 * on mount and destroyed on detach/unmount.
 */
export function useCpuSurface(options: CpuSurfaceOptions = {}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const surfaceRef = useRef<CpuSurface | null>(null);
    const inputRouterRef = useRef<InputRouter<CpuSurface> | null>(null);
    const gesturesRef = useRef<Gesture<CpuSurface>[]>([]);

    const setCanvasRef = (node: HTMLCanvasElement | null) => {
        if (canvasRef.current === node) return;

        if (surfaceRef.current) {
            inputRouterRef.current?.dispose();
            surfaceRef.current.destroy();
            surfaceRef.current = null;
            inputRouterRef.current = null;
        }

        canvasRef.current = node;

        if (node) {
            const camera =
                options.camera ??
                new Camera(
                    options.initialCamera?.pan?.x ?? 0,
                    options.initialCamera?.pan?.y ?? 0,
                    options.initialCamera?.zoom ?? 1
                );
            const controls =
                options.cameraControls ??
                createCameraControls(
                    camera,
                    options.initialCamera?.minZoom,
                    options.initialCamera?.maxZoom,
                    new Camera(camera.x, camera.y, camera.zoom)
                );

            const surface = createCpuSurface({
                canvas: node,
                camera,
                ...(options.dpr !== undefined ? { dpr: options.dpr } : {})
            });

            const inputRouter = new InputRouter({
                input: surface.input,
                cameraControls: controls,
                getSurface: () => surface,
                get gestures() {
                    return gesturesRef.current;
                }
            });

            surfaceRef.current = surface;
            inputRouterRef.current = inputRouter;
        }
    };

    return { canvasRef: setCanvasRef, surfaceRef, inputRouterRef, gesturesRef };
}

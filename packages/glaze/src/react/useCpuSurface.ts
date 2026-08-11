import { useRef } from 'react';
import { createCpuSurface, type CpuSurface } from '../cpu/CpuSurface';
import { Camera } from '../core/Camera';
import { createCameraControls, type CameraControls } from '../core/CameraControls';
import { InputRouter, type Gesture } from '../core/gestures';

/**
 * Surface construction options. `initialCamera` is applied only when no `camera` instance is given.
 */
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
 * Manages a `CpuSurface` for a `<canvas>`, wiring up its camera controls, input router, and
 * gestures. Attach the returned `canvasRef` to the element; the surface is created on mount and
 * destroyed when the ref detaches or the component unmounts.
 * @param options Surface construction options.
 * @returns Refs for the canvas node, the surface, its input router, and its gestures.
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

            const surface = createCpuSurface({ canvas: node, camera, dpr: options.dpr ?? 1 });

            // Wrap gestures so InputRouter dynamically reads gesturesRef.current at event time
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

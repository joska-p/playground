import { useRef } from 'react';
import { createGpuSurface, type GpuSurface } from '../gpu/GpuSurface';
import { Camera } from '../core/Camera';
import { createCameraControls, type CameraControls } from '../core/CameraControls';
import { InputRouter, type Gesture } from '../core/gestures';

export type GpuSurfaceOptions = {
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: {
        zoom?: number;
        pan?: { x: number; y: number };
        minZoom?: number;
        maxZoom?: number;
    };
    dpr?: number;
};

export function useGpuSurface(options: GpuSurfaceOptions = {}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const surfaceRef = useRef<GpuSurface | null>(null);
    const inputRouterRef = useRef<InputRouter<GpuSurface> | null>(null);
    const gesturesRef = useRef<Gesture<GpuSurface>[]>([]);

    const setCanvasRef = (canvasElement: HTMLCanvasElement | null) => {
        if (canvasRef.current === canvasElement) return;

        if (surfaceRef.current) {
            inputRouterRef.current?.dispose();
            surfaceRef.current.destroy();
            surfaceRef.current = null;
            inputRouterRef.current = null;
        }

        canvasRef.current = canvasElement;

        if (canvasElement) {
            const camera =
                options.camera ??
                new Camera(
                    options.initialCamera?.pan?.x ?? 0,
                    options.initialCamera?.pan?.y ?? 0,
                    options.initialCamera?.zoom ?? 1
                );
            const cameraControls =
                options.cameraControls ??
                createCameraControls(
                    camera,
                    options.initialCamera?.minZoom,
                    options.initialCamera?.maxZoom,
                    new Camera(camera.x, camera.y, camera.zoom)
                );

            const surface = createGpuSurface({
                canvas: canvasElement,
                camera,
                dpr: options.dpr ?? 1
            });

            const inputRouter = new InputRouter({
                input: surface.input,
                cameraControls: cameraControls,
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

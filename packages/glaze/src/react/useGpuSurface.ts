import { useRef } from 'react';

import { createClockStore, type ClockStore } from './clockStore';
import { createCamera, type Camera } from '../core/Camera';
import { createCameraControls, type CameraControls } from '../core/CameraControls';
import { InputRouter, type Gesture } from '../core/gestures';
import { createZoomFactor } from '../core/types';
import { createGpuSurface, type GpuSurface } from '../gpu/GpuSurface';

import type { Clock } from '../core/Clock';
import type { ClockOptions } from '../core/Clock';

export type { ClockStore } from './clockStore';

/** `initialCamera` only applies when no `camera` instance is provided. */
export interface GpuSurfaceOptions {
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: {
        zoom?: number;
        pan?: { x: number; y: number };
        minZoom?: number;
        maxZoom?: number;
    };
    clock?: Clock;
    clockOptions?: ClockOptions;
    dpr?: number;
}

/**
 * Manages a `GpuSurface` for a `<canvas>`: attach the returned `canvasRef`; the surface is created
 * on mount and destroyed on detach/unmount.
 */
export function useGpuSurface(options: GpuSurfaceOptions = {}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const surfaceRef = useRef<GpuSurface | null>(null);
    const clockStoreRef = useRef<ClockStore | null>(null);
    const inputRouterRef = useRef<InputRouter<GpuSurface> | null>(null);
    const gesturesRef = useRef<Gesture<GpuSurface>[]>([]);

    const setCanvasRef = (canvasElement: HTMLCanvasElement | null) => {
        if (canvasRef.current === canvasElement) return;

        if (surfaceRef.current) {
            inputRouterRef.current?.dispose();
            surfaceRef.current.destroy();
            surfaceRef.current = null;
            inputRouterRef.current = null;
            clockStoreRef.current = null;
        }

        canvasRef.current = canvasElement;

        if (canvasElement) {
            const camera =
                options.camera ??
                createCamera(
                    options.initialCamera?.pan?.x ?? 0,
                    options.initialCamera?.pan?.y ?? 0,
                    createZoomFactor(options.initialCamera?.zoom ?? 1)
                );
            const cameraControls =
                options.cameraControls ??
                createCameraControls(
                    camera,
                    options.initialCamera?.minZoom,
                    options.initialCamera?.maxZoom,
                    createCamera(camera.x, camera.y, camera.zoom)
                );

            const surface = createGpuSurface({
                canvas: canvasElement,
                camera,
                ...(options.clock !== undefined ? { clock: options.clock } : {}),
                ...(options.clockOptions !== undefined
                    ? { clockOptions: options.clockOptions }
                    : {}),
                ...(options.dpr !== undefined ? { dpr: options.dpr } : {})
            });

            const inputRouter = new InputRouter({
                input: surface.input,
                cameraControls: cameraControls,
                getSurface: () => surface,
                get gestures() {
                    return gesturesRef.current;
                }
            });

            clockStoreRef.current = createClockStore(surface.clock);
            surfaceRef.current = surface;
            inputRouterRef.current = inputRouter;
        }
    };

    return { canvasRef: setCanvasRef, surfaceRef, inputRouterRef, gesturesRef, clockStoreRef };
}

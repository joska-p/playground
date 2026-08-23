import { createClockStore, type ClockStore } from './clockStore';
import { createCamera, type Camera, type Point2D } from '../core/Camera';
import { createCameraControls, type CameraControls } from '../core/CameraControls';
import { InputRouter, type Gesture } from '../core/gestures';
import { createZoomFactor } from '../core/types';
import { createCpuSurface, type CpuSurface } from '../cpu/CpuSurface';
import { createGpuSurface, type GpuSurface } from '../gpu/GpuSurface';

import type { Clock, ClockOptions } from '../core/Clock';

/** Resource created alongside a surface node; `dispose` runs exactly once at detach. */
export interface StackDisposable {
    dispose(): void;
}

/** `initialCamera` only applies when no `camera` instance is provided. */
export interface CpuSurfaceOptions {
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: InitialCamera;
    dpr?: number;
}

export interface GpuSurfaceOptions extends CpuSurfaceOptions {
    clock?: Clock;
    clockOptions?: ClockOptions;
}

/** Declared spawn state of a camera created by the stack; `reset()` restores it. */
export interface InitialCamera {
    zoom?: number;
    pan?: Point2D;
    minZoom?: number;
    maxZoom?: number;
}

/** One mounted CPU surface and everything wired to it; created and disposed together. */
export interface CpuStack {
    readonly surface: CpuSurface;
    readonly controls: CameraControls;
    readonly router: InputRouter<CpuSurface>;
}

/** One mounted GPU surface and everything wired to it; created and disposed together. */
export interface GpuStack {
    readonly surface: GpuSurface;
    readonly controls: CameraControls;
    readonly router: InputRouter<GpuSurface>;
    readonly clockStore: ClockStore;
}

/**
 * Resolves the camera layer shared by every surface variant: an explicit instance wins, otherwise
 * one is built from `initialCamera` with origin defaults.
 */
export function createCameraStack(
    options: Pick<CpuSurfaceOptions, 'camera' | 'cameraControls' | 'initialCamera'>
): { camera: Camera; controls: CameraControls } {
    const initial = options.initialCamera ?? {};
    const camera =
        options.camera ??
        createCamera(initial.pan?.x ?? 0, initial.pan?.y ?? 0, createZoomFactor(initial.zoom ?? 1));
    const controls =
        options.cameraControls ?? createCameraControls(camera, initial.minZoom, initial.maxZoom);

    return { camera, controls };
}

/** Assembles a `CpuStack` for a canvas node; `dispose` tears down everything it created. */
export function createCpuStack(
    canvas: HTMLCanvasElement,
    options: CpuSurfaceOptions,
    getGestures: () => Gesture<CpuSurface>[]
): CpuStack & StackDisposable {
    const { camera, controls } = createCameraStack(options);
    const surface = createCpuSurface({
        canvas,
        camera,
        ...(options.dpr !== undefined && { dpr: options.dpr })
    });
    const router = new InputRouter({
        input: surface.input,
        cameraControls: controls,
        getSurface: () => surface,
        get gestures() {
            return getGestures();
        }
    });

    return {
        surface,
        controls,
        router,
        dispose() {
            router.dispose();
            surface.destroy();
        }
    };
}

/** Assembles a `GpuStack` for a canvas node; `dispose` tears down everything it created. */
export function createGpuStack(
    canvas: HTMLCanvasElement,
    options: GpuSurfaceOptions,
    getGestures: () => Gesture<GpuSurface>[]
): GpuStack & StackDisposable {
    const { camera, controls } = createCameraStack(options);
    const surface = createGpuSurface({
        canvas,
        camera,
        ...(options.clock !== undefined && { clock: options.clock }),
        ...(options.clockOptions !== undefined && { clockOptions: options.clockOptions }),
        ...(options.dpr !== undefined && { dpr: options.dpr })
    });
    const router = new InputRouter({
        input: surface.input,
        cameraControls: controls,
        getSurface: () => surface,
        get gestures() {
            return getGestures();
        }
    });

    return {
        surface,
        controls,
        router,
        clockStore: createClockStore(surface.clock),
        dispose() {
            router.dispose();
            surface.destroy();
        }
    };
}

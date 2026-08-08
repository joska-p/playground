import { useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Camera, clamp, type Point2D, type ZoomBounds } from '../core/coords/camera';

export type CameraOptions = {
    zoom?: number;
    pan?: Point2D;
    minZoom?: number;
    maxZoom?: number;
};

export type GestureHandlers = {
    onPointerDown: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
    onPointerMove: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
    onPointerUp: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
    onPointerCancel: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
};

export type CameraControls = {
    panTo(position: Point2D): void;
    zoomTo(zoom: number, focalPoint?: Point2D): void;
    reset(): void;
    update(partial: Partial<Camera>): void;

    /**
     * Low-level helpers for custom surfaces that do not use the
     * CpuCanvas / GpuCanvas interaction system.
     * Prefer createInteractionController for new code.
     */
    bindGestures(options?: { pan?: boolean }): GestureHandlers;
    attachWheel(target: HTMLElement): () => void;
};

type CameraHandle = {
    camera: Camera;
    controls: CameraControls;
};

type WheelEventLike = {
    deltaY: number;
    clientX: number;
    clientY: number;
    preventDefault: () => void;
    target: EventTarget | null;
};

function createCameraControls(
    camera: Camera,
    minZoom: number,
    maxZoom: number,
    initial: Camera
): CameraControls {
    const dragging = { active: false };
    const bounds: ZoomBounds = { minZoom, maxZoom };

    const handleWheel = (event: WheelEventLike): void => {
        event.preventDefault();
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const rect = target.getBoundingClientRect();
        const focalPoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        camera.zoomAt(focalPoint, camera.zoom * Math.exp(-event.deltaY * 0.002), bounds);
    };

    return {
        panTo(position) {
            camera.x = position.x;
            camera.y = position.y;
        },

        zoomTo(zoom, focalPoint) {
            if (focalPoint) {
                camera.zoomAt(focalPoint, zoom, bounds);
            } else {
                camera.zoom = clamp(minZoom, maxZoom)(zoom);
            }
        },

        reset() {
            camera.x = initial.x;
            camera.y = initial.y;
            camera.zoom = initial.zoom;
        },

        update(partial) {
            Object.assign(camera, partial);
        },

        bindGestures(options = {}) {
            const pan = options.pan ?? true;
            return {
                onPointerDown(event) {
                    if (!pan) return;
                    dragging.active = true;
                    event.currentTarget.setPointerCapture(event.pointerId);
                },
                onPointerMove(event) {
                    if (!dragging.active) return;
                    camera.x += event.movementX;
                    camera.y += event.movementY;
                },
                onPointerUp() {
                    dragging.active = false;
                },
                onPointerCancel() {
                    dragging.active = false;
                }
            };
        },

        attachWheel(target) {
            const listener = (event: WheelEvent) => {
                handleWheel(event);
            };
            target.addEventListener('wheel', listener, { passive: false });
            return () => {
                target.removeEventListener('wheel', listener);
            };
        }
    };
}

function createCamera(options: CameraOptions = {}): CameraHandle {
    const camera = new Camera(options.pan?.x ?? 0, options.pan?.y ?? 0, options.zoom ?? 1);

    const initial = new Camera(camera.x, camera.y, camera.zoom);
    const controls = createCameraControls(
        camera,
        options.minZoom ?? 0.05,
        options.maxZoom ?? 64,
        initial
    );

    return { camera, controls };
}

export function useCamera(options: CameraOptions = {}): [Camera, CameraControls] {
    const [handle] = useState(() => createCamera(options));
    return [handle.camera, handle.controls];
}

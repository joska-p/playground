import { useState } from 'react';
import { Camera, clamp, type Point2D, type ZoomBounds } from '../core/coords/camera';

export type CameraOptions = {
    zoom?: number;
    pan?: Point2D;
    minZoom?: number;
    maxZoom?: number;
};

export type CameraControls = {
    panTo(position: Point2D): void;
    zoomTo(zoom: number, focalPoint?: Point2D): void;
    reset(): void;
    update(partial: Partial<Camera>): void;
};

type CameraHandle = {
    camera: Camera;
    controls: CameraControls;
};

function createCameraControls(
    camera: Camera,
    minZoom: number,
    maxZoom: number,
    initial: Camera
): CameraControls {
    const bounds: ZoomBounds = { minZoom, maxZoom };

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

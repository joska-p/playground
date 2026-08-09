import { useState } from 'react';
import { Camera, DEFAULT_ZOOM_BOUNDS, type Point2D } from '../core/Camera';
import { createCameraControls, type CameraControls } from '../core/CameraControls';

export type { CameraControls } from '../core/CameraControls';

export type CameraOptions = {
    zoom?: number;
    pan?: Point2D;
    minZoom?: number;
    maxZoom?: number;
};

type CameraHandle = {
    camera: Camera;
    controls: CameraControls;
};

function createCamera(options: CameraOptions = {}): CameraHandle {
    const camera = new Camera(options.pan?.x ?? 0, options.pan?.y ?? 0, options.zoom ?? 1);

    const initial = new Camera(camera.x, camera.y, camera.zoom);
    const controls = createCameraControls(
        camera,
        options.minZoom ?? DEFAULT_ZOOM_BOUNDS.minZoom,
        options.maxZoom ?? DEFAULT_ZOOM_BOUNDS.maxZoom,
        initial
    );

    return { camera, controls };
}

export function useCamera(options: CameraOptions = {}): [Camera, CameraControls] {
    const [handle] = useState(() => createCamera(options));
    return [handle.camera, handle.controls];
}

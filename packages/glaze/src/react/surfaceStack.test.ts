import { describe, expect, it } from 'vitest';

import { createCameraStack } from './surfaceStack';
import { DEFAULT_ZOOM_BOUNDS, createCamera } from '../core/Camera';
import { createCameraControls } from '../core/CameraControls';
import { createZoomFactor } from '../core/types';

const cameraAt = (x: number, y: number, zoom: number) => createCamera(x, y, createZoomFactor(zoom));

describe('createCameraStack', () => {
    it('defaults to an origin camera and the default zoom bounds', () => {
        const { camera, controls } = createCameraStack({});

        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });

        controls.zoomBy(1000, { x: 0, y: 0 });
        expect(camera.zoom).toBe(DEFAULT_ZOOM_BOUNDS.maxZoom);
    });

    it('builds the camera from initialCamera when no instance is provided', () => {
        const { camera } = createCameraStack({
            initialCamera: { pan: { x: 120, y: -40 }, zoom: 2, minZoom: 0.5, maxZoom: 4 }
        });

        expect(camera).toEqual({ x: 120, y: -40, zoom: 2 });
    });

    it('ignores initialCamera when a camera instance is provided', () => {
        const shared = cameraAt(500, 200, 3);
        const { camera } = createCameraStack({
            camera: shared,
            initialCamera: { pan: { x: 1, y: 1 }, zoom: 1 }
        });

        expect(camera).toBe(shared);
    });

    it('returns provided controls untouched', () => {
        const camera = cameraAt(0, 0, 1);
        const controls = createCameraControls(camera, 0.5, 4);
        const { controls: resolved } = createCameraStack({ cameraControls: controls });

        expect(resolved).toBe(controls);
    });

    it('reset() restores the declared spawn state', () => {
        const { camera, controls } = createCameraStack({
            initialCamera: { pan: { x: 500, y: -20 }, zoom: 2 }
        });

        controls.panBy(10, 30);
        controls.zoomBy(4, { x: 0, y: 0 });
        controls.reset();

        expect(camera).toEqual({ x: 500, y: -20, zoom: 2 });
    });
});

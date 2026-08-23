import { describe, expect, it, vi } from 'vitest';

import { createCpuStack, type CpuSurfaceOptions } from './surfaceStack';
import { DEFAULT_ZOOM_BOUNDS, createCamera } from '../core/Camera';
import { createCameraControls } from '../core/CameraControls';
import { InputStore } from '../core/InputStore';
import { createZoomFactor } from '../core/types';

const cameraAt = (x: number, y: number, zoom: number) => createCamera(x, y, createZoomFactor(zoom));

function stackWith(options: CpuSurfaceOptions) {
    const canvas = document.createElement('canvas');

    vi.spyOn(canvas, 'getContext').mockReturnValue({} as CanvasRenderingContext2D);

    return createCpuStack(canvas, options, () => []);
}

describe('createCpuStack camera layer resolution', () => {
    it('defaults to an origin camera and the default zoom bounds', () => {
        const stack = stackWith({});

        expect(stack.surface.camera).toEqual({ x: 0, y: 0, zoom: 1 });

        stack.controls.zoomBy(1000, { x: 0, y: 0 });
        expect(stack.surface.camera.zoom).toBe(DEFAULT_ZOOM_BOUNDS.maxZoom);
        stack.dispose();
    });

    it('builds the camera from initialCamera when no instance is provided', () => {
        const stack = stackWith({
            initialCamera: { pan: { x: 120, y: -40 }, zoom: 2, minZoom: 0.5, maxZoom: 4 }
        });

        expect(stack.surface.camera).toEqual({ x: 120, y: -40, zoom: 2 });
        stack.dispose();
    });

    it('ignores initialCamera when a camera instance is provided', () => {
        const shared = cameraAt(500, 200, 3);
        const stack = stackWith({
            camera: shared,
            initialCamera: { pan: { x: 1, y: 1 }, zoom: 1 }
        });

        expect(stack.surface.camera).toBe(shared);
        stack.dispose();
    });

    it('returns provided controls untouched', () => {
        const camera = cameraAt(0, 0, 1);
        const controls = createCameraControls(camera, 0.5, 4);
        const stack = stackWith({ cameraControls: controls });

        expect(stack.controls).toBe(controls);
        stack.dispose();
    });

    it('reset() restores the declared spawn state', () => {
        const stack = stackWith({
            initialCamera: { pan: { x: 500, y: -20 }, zoom: 2 }
        });

        stack.controls.panBy(10, 30);
        stack.controls.zoomBy(4, { x: 0, y: 0 });
        stack.controls.reset();

        expect(stack.surface.camera).toEqual({ x: 500, y: -20, zoom: 2 });
        stack.dispose();
    });
});

describe('createCpuStack lifecycle', () => {
    it('exposes a router bound to the resolved controls and disposes in order', () => {
        const stack = stackWith({});
        const disposeSpy = vi.spyOn(stack.router, 'dispose');
        const destroySpy = vi.spyOn(stack.surface, 'destroy');

        stack.dispose();

        expect(disposeSpy).toHaveBeenCalledTimes(1);
        expect(destroySpy).toHaveBeenCalledTimes(1);
    });

    it('destroys the surface and rethrows when the router fails to subscribe', () => {
        const canvas = document.createElement('canvas');

        vi.spyOn(canvas, 'getContext').mockReturnValue({} as CanvasRenderingContext2D);

        const subscribeSpy = vi.spyOn(InputStore.prototype, 'subscribe').mockImplementation(() => {
            throw new Error('subscribe failed');
        });
        const destroySpy = vi.spyOn(InputStore.prototype, 'destroy');

        expect(() => stackWith({})).toThrow('subscribe failed');
        expect(destroySpy).toHaveBeenCalledTimes(1);

        subscribeSpy.mockRestore();
        destroySpy.mockRestore();
    });
});

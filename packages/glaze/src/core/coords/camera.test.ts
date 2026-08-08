import { describe, expect, it } from 'vitest';
import { Camera, defaultCamera, type ZoomBounds } from './camera';

describe('camera', () => {
    it('defaults to the identity camera', () => {
        expect(defaultCamera()).toEqual({ x: 0, y: 0, zoom: 1 });
        expect(new Camera()).toBeInstanceOf(Camera);
    });

    it('maps world to screen and back', () => {
        const camera = new Camera(40, -20, 2);
        const world = { x: 10, y: 5 };
        const screen = camera.worldToScreen(world);
        expect(screen).toEqual({ x: 60, y: -10 });
        expect(camera.screenToWorld(screen)).toEqual({ x: 10, y: 5 });
    });

    it('handles zoom below one', () => {
        const camera = new Camera(0, 0, 0.5);
        expect(camera.worldToScreen({ x: 10, y: 10 })).toEqual({ x: 5, y: 5 });
        expect(camera.screenToWorld({ x: 5, y: 5 })).toEqual({ x: 10, y: 10 });
    });

    it('zoomAt scales around the focal point and clamps to bounds', () => {
        const bounds: ZoomBounds = { minZoom: 0.5, maxZoom: 4 };
        const camera = new Camera(0, 0, 1);
        camera.zoomAt({ x: 50, y: 0 }, 2, bounds);
        expect(camera.zoom).toBe(2);
        expect(camera.screenToWorld({ x: 50, y: 0 })).toEqual({ x: 50, y: 0 });

        camera.zoomAt({ x: 0, y: 0 }, 8, bounds);
        expect(camera.zoom).toBe(4);
    });
});

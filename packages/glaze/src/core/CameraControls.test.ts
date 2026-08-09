import { describe, expect, it } from 'vitest';
import { Camera } from './Camera';
import { createCameraControls } from './CameraControls';

describe('createCameraControls', () => {
    it('panTo moves the camera without touching zoom', () => {
        const camera = new Camera(10, 20, 2);
        const controls = createCameraControls(camera, 0.5, 4);
        controls.panTo({ x: -5, y: 7 });
        expect(camera).toEqual({ x: -5, y: 7, zoom: 2 });
    });

    it('panBy offsets the camera without touching zoom', () => {
        const camera = new Camera(10, 20, 2);
        const controls = createCameraControls(camera, 0.5, 4);
        controls.panBy(5, -3);
        expect(camera).toEqual({ x: 15, y: 17, zoom: 2 });
    });

    it('zoomAt scales around the focal point and clamps to bounds', () => {
        const camera = new Camera(0, 0, 1);
        const controls = createCameraControls(camera, 0.5, 4);
        controls.zoomAt({ x: 50, y: 0 }, 2);
        expect(camera.zoom).toBe(2);
        expect(camera.screenToWorld({ x: 50, y: 0 })).toEqual({ x: 50, y: 0 });

        controls.zoomAt({ x: 0, y: 0 }, 8);
        expect(camera.zoom).toBe(4);
    });

    it('zoomTo with a focal point scales around it and clamps', () => {
        const camera = new Camera(0, 0, 1);
        const controls = createCameraControls(camera, 0.5, 4);
        controls.zoomTo(2, { x: 50, y: 0 });
        expect(camera.zoom).toBe(2);
        expect(camera.screenToWorld({ x: 50, y: 0 })).toEqual({ x: 50, y: 0 });
    });

    it('zoomTo without a focal point just sets the zoom and clamps', () => {
        const camera = new Camera(10, 20, 1);
        const controls = createCameraControls(camera, 0.5, 4);
        controls.zoomTo(2);
        expect(camera).toEqual({ x: 10, y: 20, zoom: 2 });

        controls.zoomTo(100);
        expect(camera.zoom).toBe(4);
    });

    it('zoomBy scales around the focal point and clamps to bounds', () => {
        const camera = new Camera(0, 0, 1);
        const controls = createCameraControls(camera, 0.5, 4);
        controls.zoomBy(2, { x: 50, y: 0 });
        expect(camera.zoom).toBe(2);
        expect(camera.screenToWorld({ x: 50, y: 0 })).toEqual({ x: 50, y: 0 });

        controls.zoomBy(10, { x: 0, y: 0 });
        expect(camera.zoom).toBe(4);
    });

    it('uses default zoom bounds when none are configured', () => {
        const camera = new Camera(0, 0, 1);
        const controls = createCameraControls(camera);
        controls.zoomBy(1000, { x: 0, y: 0 });
        expect(camera.zoom).toBe(64);
    });

    it('reset restores the initial camera state', () => {
        const camera = new Camera(0, 0, 1);
        const controls = createCameraControls(camera, 0.5, 4, new Camera(0, 0, 1));
        controls.panBy(10, 20);
        controls.zoomBy(2, { x: 0, y: 0 });
        controls.reset();
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
    });

    it('update applies a partial camera state', () => {
        const camera = new Camera(1, 2, 3);
        const controls = createCameraControls(camera);
        controls.update({ zoom: 1.5 });
        expect(camera).toEqual({ x: 1, y: 2, zoom: 1.5 });
    });
});

import { describe, expect, it } from 'vitest';
import { Camera, defaultCamera } from './camera';

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

    it('never mutates itself', () => {
        const camera = new Camera(40, -20, 2);
        camera.worldToScreen({ x: 10, y: 5 });
        camera.screenToWorld({ x: 60, y: -10 });
        expect(camera).toEqual({ x: 40, y: -20, zoom: 2 });
    });
});

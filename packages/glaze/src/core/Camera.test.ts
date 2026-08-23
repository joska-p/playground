import { describe, expect, expectTypeOf, it } from 'vitest';

import {
    createCamera,
    createZoomBounds,
    createZoomClamp,
    defaultCamera,
    toScreenPoint,
    toWorldDelta,
    toWorldPoint
} from './Camera';
import { createZoomFactor } from './types';

describe('camera', () => {
    it('defaults to the identity camera', () => {
        expect(defaultCamera()).toEqual({ x: 0, y: 0, zoom: 1 });
        expect(createCamera(1, 2, createZoomFactor(3))).toBeInstanceOf(Object);
    });

    it('rejects non-finite positions at the factory', () => {
        expect(() => createCamera(Number.NaN, 0, createZoomFactor(1))).toThrow(
            'Glaze: camera x must be a finite number, received NaN'
        );
        expect(() => createCamera(0, Number.POSITIVE_INFINITY, createZoomFactor(1))).toThrow(
            'Glaze: camera y must be a finite number'
        );
    });

    it('requires a branded zoom factor', () => {
        const camera = createCamera(40, -20, createZoomFactor(2));

        expect(camera.zoom).toBe(2);
        expectTypeOf(2).not.toEqualTypeOf(camera.zoom);
    });

    it('maps world to screen and back', () => {
        const camera = createCamera(40, -20, createZoomFactor(2));
        const world = toWorldPoint({ x: 10, y: 5 });
        const screen = camera.worldToScreen(world);

        expect(screen).toEqual({ x: 60, y: -10 });
        expect(camera.screenToWorld(screen)).toEqual({ x: 10, y: 5 });
    });

    it('handles zoom below one', () => {
        const camera = createCamera(0, 0, createZoomFactor(0.5));
        const world = toWorldPoint({ x: 10, y: 10 });

        expect(camera.worldToScreen(world)).toEqual({ x: 5, y: 5 });
        expect(camera.screenToWorld(toScreenPoint({ x: 5, y: 5 }))).toEqual({ x: 10, y: 10 });
    });

    it('never mutates itself', () => {
        const camera = createCamera(40, -20, createZoomFactor(2));

        camera.worldToScreen(toWorldPoint({ x: 10, y: 5 }));
        camera.screenToWorld(toScreenPoint({ x: 60, y: -10 }));
        expect(camera).toEqual({ x: 40, y: -20, zoom: 2 });
    });

    it('keeps screen and world frames distinct', () => {
        const screen = toScreenPoint({ x: 1, y: 2 });
        const world = toWorldPoint({ x: 1, y: 2 });

        expectTypeOf(screen).not.toEqualTypeOf(world);
    });

    it('rejects non-finite point coordinates', () => {
        expect(() => toScreenPoint({ x: Number.NaN, y: 0 })).toThrow(
            'Glaze: screen point x must be a finite number'
        );
        expect(() => toWorldDelta({ x: 0, y: Number.POSITIVE_INFINITY })).toThrow(
            'Glaze: world delta y must be a finite number'
        );
    });
});

describe('zoom bounds', () => {
    it('accepts ordered positive bounds', () => {
        expect(createZoomBounds(0.5, 4)).toEqual({ minZoom: 0.5, maxZoom: 4 });
    });

    it('rejects inverted, touching or degenerate bounds', () => {
        expect(() => createZoomBounds(4, 0.5)).toThrow('must be strictly below');
        expect(() => createZoomBounds(2, 2)).toThrow('must be strictly below');
        expect(() => createZoomBounds(0, 4)).toThrow('min zoom must be strictly positive');
        expect(() => createZoomBounds(0.5, Number.NaN)).toThrow('max zoom must be a finite number');
    });
});

describe('zoom clamp', () => {
    it('clamps into the configured bounds', () => {
        const clampZoom = createZoomClamp(0.5, 4);

        expect(clampZoom(2)).toBe(2);
        expect(clampZoom(100)).toBe(4);
        expect(clampZoom(0.01)).toBe(0.5);
    });

    it('never returns zero or negative zoom, even with extreme inputs', () => {
        const clampZoom = createZoomClamp(0.05, 64);

        expect(clampZoom(-10)).toBe(0.05);
        expect(clampZoom(Number.MAX_VALUE)).toBe(64);
    });

    it('throws on NaN instead of propagating it', () => {
        const clampZoom = createZoomClamp(0.5, 4);

        expect(() => clampZoom(Number.NaN)).toThrow(
            'Glaze: zoom must be a finite number, received NaN'
        );
    });

    it('rejects invalid bound configuration at creation', () => {
        expect(() => createZoomClamp(64, 0.05)).toThrow('must be strictly below');
    });
});

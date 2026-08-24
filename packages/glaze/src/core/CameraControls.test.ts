import { describe, expect, it } from 'vitest';

import { createCamera, createZoomClamp, defaultCamera, toScreenDelta, toScreenPoint } from './Camera';
import {
    createCameraControls,
    panBy,
    panTo,
    patchCamera,
    zoomAt,
    zoomBy,
    zoomTo,
    type CameraPatch
} from './CameraControls';
import { createZoomFactor } from './types';

const cameraAt = (x: number, y: number, zoom: number) => createCamera(x, y, createZoomFactor(zoom));
const clampZoom = createZoomClamp(0.05, 64);
const nanPatch: CameraPatch = { x: Number.NaN };

describe('panBy', () => {
    it('translates by a screen delta and keeps the zoom', () => {
        const next = panBy(cameraAt(100, 50, 2), toScreenDelta({ x: -30, y: 10 }));

        expect(next.x).toBe(70);
        expect(next.y).toBe(60);
        expect(next.zoom).toBe(2);
    });

    it('leaves the source camera untouched', () => {
        const camera = defaultCamera();

        panBy(camera, toScreenDelta({ x: 5, y: 5 }));

        expect(camera).toStrictEqual(defaultCamera());
    });

    it('rejects non-finite deltas instead of poisoning coordinates', () => {
        expect(() => panBy(defaultCamera(), toScreenDelta({ x: Number.NaN, y: 0 }))).toThrow(
            /^Glaze:/
        );
    });
});

describe('panTo', () => {
    it('places the world origin at the given screen position', () => {
        const next = panTo(cameraAt(10, 20, 4), toScreenPoint({ x: 300, y: 200 }));

        expect(next.x).toBe(300);
        expect(next.y).toBe(200);
        expect(next.zoom).toBe(4);
    });
});

describe('zoomAt', () => {
    it('pins the world point under the focal point', () => {
        const camera = cameraAt(100, 50, 2);
        const focal = toScreenPoint({ x: 200, y: 100 });
        const anchored = camera.screenToWorld(focal);

        expect(zoomAt(camera, focal, 8, clampZoom).screenToWorld(focal)).toEqual(anchored);
    });

    it('clamps the requested zoom into bounds', () => {
        const next = zoomAt(defaultCamera(), toScreenPoint({ x: 0, y: 0 }), 1e9, clampZoom);

        expect(next.zoom).toBe(64);
    });

    it('throws on a NaN zoom instead of propagating it', () => {
        expect(() =>
            zoomAt(defaultCamera(), toScreenPoint({ x: 0, y: 0 }), Number.NaN, clampZoom)
        ).toThrow(/^Glaze:/);
    });
});

describe('zoomTo', () => {
    it('keeps the translation when no focal point is given', () => {
        const next = zoomTo(cameraAt(-40, 80, 2), 500, clampZoom);

        expect(next.x).toBe(-40);
        expect(next.y).toBe(80);
        expect(next.zoom).toBe(64);
    });

    it('anchors to the focal point when one is given', () => {
        const camera = cameraAt(100, 50, 2);
        const focal = toScreenPoint({ x: 200, y: 100 });
        const pinned = camera.screenToWorld(focal);

        expect(zoomTo(camera, 8, clampZoom, focal).screenToWorld(focal)).toEqual(pinned);
    });
});

describe('zoomBy', () => {
    it('scales the current zoom around the focal point', () => {
        const next = zoomBy(cameraAt(0, 0, 2), 3, toScreenPoint({ x: 10, y: 10 }), clampZoom);

        expect(next.zoom).toBe(6);
    });

    it('clamps the resulting zoom, not the factor', () => {
        const next = zoomBy(cameraAt(0, 0, 32), 16, toScreenPoint({ x: 0, y: 0 }), clampZoom);

        expect(next.zoom).toBe(64);
    });
});

describe('patchCamera', () => {
    it('carries omitted fields over from the source camera', () => {
        const next = patchCamera(cameraAt(5, 6, 2), { x: 9 }, clampZoom);

        expect(next.x).toBe(9);
        expect(next.y).toBe(6);
        expect(next.zoom).toBe(2);
    });

    it('clamps the patched zoom instead of injecting raw values', () => {
        const next = patchCamera(cameraAt(0, 0, 1), { zoom: -3 }, clampZoom);

        expect(next.zoom).toBe(0.05);
    });

    it('throws on non-finite coordinates', () => {
        expect(() => patchCamera(cameraAt(0, 0, 1), nanPatch, clampZoom)).toThrow(/^Glaze:/);
    });
});

describe('createCameraControls', () => {
    it('commits transforms onto the captured camera', () => {
        const camera = defaultCamera();
        const controls = createCameraControls(camera);

        controls.panBy(15, -5);

        expect(camera.x).toBe(15);
        expect(camera.y).toBe(-5);
    });

    it('restores the mount-time state on reset(), even for a non-default camera', () => {
        const camera = cameraAt(120, -30, 3);
        const controls = createCameraControls(camera);

        controls.panBy(10, 10);
        controls.zoomTo(0.01);
        controls.reset();

        expect(camera.x).toBe(120);
        expect(camera.y).toBe(-30);
        expect(camera.zoom).toBe(3);
    });

    it('routes patch() through the clamp', () => {
        const camera = defaultCamera();
        const controls = createCameraControls(camera);

        controls.patch({ zoom: 1e12 });

        expect(camera.zoom).toBe(64);
    });
});

describe('type-level guards', () => {
    it('rejects unbranded screen deltas', () => {
        const camera = defaultCamera();

        // @ts-expect-error a bare point is not a ScreenDelta
        panBy(camera, { x: 1, y: 1 });
    });
});

import { describe, expect, it, vi } from 'vitest';

import { CpuSurface } from './CpuSurface';
import { Camera } from '../core/Camera';

function surfaceWithCamera(camera: Camera): CpuSurface {
    const canvas = document.createElement('canvas');

    vi.spyOn(canvas, 'getContext').mockReturnValue({} as CanvasRenderingContext2D);

    return new CpuSurface({ canvas, camera });
}

describe('CpuSurface space conversions', () => {
    it('pointer is the cursor mapped into world space through the camera', () => {
        const surface = surfaceWithCamera(new Camera(10, 10, 2));

        surface.canvas.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 20, clientY: 30, bubbles: true })
        );
        expect(surface.pointer).toEqual({ x: 5, y: 10 });
        surface.destroy();
    });

    it('screenToWorld and worldToScreen round-trip through the camera', () => {
        const surface = surfaceWithCamera(new Camera(10, 10, 2));
        const screen = { x: 40, y: 50 };
        const world = surface.screenToWorld(screen);

        expect(world).toEqual({ x: 15, y: 20 });
        expect(surface.worldToScreen(world)).toEqual(screen);
        surface.destroy();
    });
});

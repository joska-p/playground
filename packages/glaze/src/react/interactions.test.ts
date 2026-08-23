import { describe, expect, it, vi } from 'vitest';

import { createInteractionAdapter, type LiveInteractionEvent } from './interactions';
import { defaultCamera } from '../core/Camera';
import { createCameraControls } from '../core/CameraControls';
import { InputRouter, PanGesture, ZoomGesture } from '../core/gestures';
import { InputStore } from '../core/InputStore';

function setup() {
    const target = document.createElement('div');
    const input = new InputStore();

    input.attach(target);

    return { target, input };
}

function setupCamera() {
    const camera = defaultCamera();
    const cameraControls = createCameraControls(camera, 0.05, 64);

    return { camera, cameraControls };
}

describe('createInteractionAdapter', () => {
    it('defaults to the built-in pan and zoom gestures', () => {
        const gestures = createInteractionAdapter();

        expect(gestures).toHaveLength(2);
        expect(gestures[0]).toBeInstanceOf(PanGesture);
        expect(gestures[1]).toBeInstanceOf(ZoomGesture);
    });

    it('turns pan and zoom off with false', () => {
        expect(createInteractionAdapter({ pan: false, zoom: false })).toEqual([]);
    });

    it('turns only pan off with false', () => {
        const gestures = createInteractionAdapter({ pan: false });

        expect(gestures).toHaveLength(1);
        expect(gestures[0]).toBeInstanceOf(ZoomGesture);
    });

    it('replaces the built-in pan when onStart is provided', () => {
        const gestures = createInteractionAdapter({ onStart: vi.fn() });

        expect(gestures.some((g) => g instanceof PanGesture)).toBe(false);
    });

    it('replaces the built-in pan when onMove is provided', () => {
        const gestures = createInteractionAdapter({ onMove: vi.fn() });

        expect(gestures.some((g) => g instanceof PanGesture)).toBe(false);
    });

    it('keeps the built-in pan when only terminal handlers are provided', () => {
        const gestures = createInteractionAdapter({ onEnd: vi.fn() });

        expect(gestures.some((g) => g instanceof PanGesture)).toBe(true);
    });

    it('keeps the built-in pan when only onContextMenu is provided', () => {
        const gestures = createInteractionAdapter({ onContextMenu: vi.fn() });

        expect(gestures.some((g) => g instanceof PanGesture)).toBe(true);
    });

    it('replaces the built-in zoom when onZoom is provided', () => {
        const gestures = createInteractionAdapter({ onZoom: vi.fn() });

        expect(gestures.some((g) => g instanceof ZoomGesture)).toBe(false);
    });

    it('delivers a live surface to custom handlers through the router', () => {
        const { target, input } = setup();
        const { cameraControls } = setupCamera();
        const onStart =
            vi.fn<(event: LiveInteractionEvent<PointerEvent, { input: InputStore }>) => void>();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => ({ input }),
            gestures: createInteractionAdapter({ onStart })
        });

        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        expect(onStart).toHaveBeenCalledTimes(1);
        const event = onStart.mock.calls[0]?.[0];

        expect(event.surface).toEqual({ input });
        router.dispose();
        input.detach();
    });

    it('does not pan when custom drag handlers replace the built-in', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => ({ input }),
            gestures: createInteractionAdapter({ onStart: vi.fn(), onMove: vi.fn() })
        });

        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true })
        );
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        router.dispose();
        input.detach();
    });
});

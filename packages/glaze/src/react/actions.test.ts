import { describe, expect, it, vi } from 'vitest';
import { Camera } from '../core/coords/camera';
import { InputStore } from '../cpu/createInputStore';
import { createInputRouter, type PointerHandlers } from './actions';

type FakeSurface = { input: InputStore };

function setup() {
    const target = document.createElement('div');
    const input = new InputStore();
    input.attach(target);
    return { target, input };
}

function wheelEvent(init: {
    deltaY: number;
    clientX?: number;
    clientY?: number;
    bubbles?: boolean;
    cancelable?: boolean;
}) {
    const event = new WheelEvent('wheel', init);
    if (init.clientX !== undefined) Object.defineProperty(event, 'clientX', { value: init.clientX });
    if (init.clientY !== undefined) Object.defineProperty(event, 'clientY', { value: init.clientY });
    return event;
}

function pan(camera: Camera) {
    expect(camera).toEqual({ x: 20, y: 30, zoom: 1 });
}

describe('createInputRouter', () => {
    it('pans the camera while dragging with the matching button', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => null,
            pan: true
        });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true }));
        pan(camera);
        dispose();
        input.detach();
    });

    it('does not pan when a consumer handler consumes the event', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const pointerHandlers: PointerHandlers<FakeSurface> = {
            onPointerDown: () => true,
            onPointerMove: () => true
        };
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => ({ input }),
            pointerHandlers,
            pan: true
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true }));
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        dispose();
        input.detach();
    });

    it('chains a non-consuming handler with the default pan', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const onPointerMove = vi.fn(() => false);
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => ({ input }),
            pointerHandlers: { onPointerMove },
            pan: true
        });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true }));
        expect(onPointerMove).toHaveBeenCalledTimes(1);
        pan(camera);
        dispose();
        input.detach();
    });

    it('respects panButton', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => null,
            pan: true,
            panButton: [2]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true }));
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        dispose();
        input.detach();
    });

    it('zooms around the wheel focal point and prevents default', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => null,
            zoom: true,
            zoomSpeed: 0.001
        });
        const event = wheelEvent({
            deltaY: 100,
            clientX: 100,
            clientY: 50,
            bubbles: true,
            cancelable: true
        });
        target.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        expect(camera.zoom).toBeCloseTo(Math.exp(-0.1), 6);
        expect(camera.screenToWorld({ x: 100, y: 50 })).toEqual({ x: 100, y: 50 });
        dispose();
        input.detach();
    });

    it('clamps zoom to the configured bounds', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => null,
            zoom: true,
            minZoom: 0.5,
            maxZoom: 2
        });
        target.dispatchEvent(
            wheelEvent({ deltaY: -100000, bubbles: true, cancelable: true })
        );
        expect(camera.zoom).toBe(2);
        dispose();
        input.detach();
    });

    it('lets a consumer wheel handler override the default zoom', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => ({ input }),
            zoom: true,
            pointerHandlers: { onWheel: () => true }
        });
        target.dispatchEvent(
            wheelEvent({ deltaY: 100, bubbles: true, cancelable: true })
        );
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        dispose();
        input.detach();
    });

    it('prevents the context menu when right-button panning is enabled', () => {
        const { target, input } = setup();
        const camera = new Camera();
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => null,
            pan: true,
            panButton: 2
        });
        const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
        target.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        dispose();
        input.detach();
    });

    it('stops routing after dispose', () => {
        const { target, input } = setup();
        const camera = new Camera(0, 0, 1);
        const { dispose } = createInputRouter({
            input,
            camera,
            getSurface: () => null,
            pan: true
        });
        dispose();
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true }));
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        input.detach();
    });
});

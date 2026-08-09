import { describe, expect, it, vi } from 'vitest';
import { Camera } from '../core/coords/camera';
import { createCameraControls } from '../core/coords/cameraControls';
import { InputStore } from '../cpu/createInputStore';
import {
    createInputRouter,
    createPanGesture,
    createPointerHandlersGesture,
    createZoomGesture,
    type PointerHandlers
} from './actions';

type FakeSurface = { input: InputStore };

function setup() {
    const target = document.createElement('div');
    const input = new InputStore();
    input.attach(target);
    return { target, input };
}

function setupCamera(minZoom = 0.05, maxZoom = 64) {
    const camera = new Camera();
    const controls = createCameraControls(camera, minZoom, maxZoom);
    return { camera, controls };
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
        const { camera, controls } = setupCamera();
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [createPanGesture()]
        });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true }));
        pan(camera);
        dispose();
        input.detach();
    });

    it('does not pan when a consumer gesture consumes the event', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const pointerHandlers: PointerHandlers<FakeSurface> = {
            onPointerDown: () => true,
            onPointerMove: () => true
        };
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => ({ input }),
            gestures: [createPointerHandlersGesture(pointerHandlers), createPanGesture()]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true }));
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        dispose();
        input.detach();
    });

    it('chains a non-consuming gesture with the default pan', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const onPointerMove = vi.fn(() => false);
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => ({ input }),
            gestures: [createPointerHandlersGesture({ onPointerMove }), createPanGesture()]
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
        const { camera, controls } = setupCamera();
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [createPanGesture({ button: [2] })]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true }));
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        dispose();
        input.detach();
    });

    it('stops the chain at the first gesture that consumes', () => {
        const { target, input } = setup();
        const { controls } = setupCamera();
        const first = { onPointerDown: () => true };
        const second = { onPointerDown: vi.fn() };
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [first, second]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        expect(second.onPointerDown).not.toHaveBeenCalled();
        dispose();
        input.detach();
    });

    it('lets a non-consuming first gesture pass through to the next', () => {
        const { target, input } = setup();
        const { controls } = setupCamera();
        const first = { onPointerDown: () => false };
        const second = { onPointerDown: vi.fn(() => true) };
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [first, second]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        expect(second.onPointerDown).toHaveBeenCalledTimes(1);
        dispose();
        input.detach();
    });

    it('broadcasts pointerup so released pan state resets even after a consume', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [createPointerHandlersGesture({ onPointerMove: () => false }), createPanGesture()]
        });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true }));
        expect(camera).toEqual({ x: 20, y: 30, zoom: 1 });
        target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true }));
        expect(camera).toEqual({ x: 20, y: 30, zoom: 1 });
        dispose();
        input.detach();
    });

    it('zooms around the wheel focal point and prevents default', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [createZoomGesture({ speed: 0.001 })]
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
        const { camera, controls } = setupCamera(0.5, 2);
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [createZoomGesture()]
        });
        target.dispatchEvent(
            wheelEvent({ deltaY: -100000, bubbles: true, cancelable: true })
        );
        expect(camera.zoom).toBe(2);
        dispose();
        input.detach();
    });

    it('lets a consumer wheel gesture override the default zoom', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => ({ input }),
            gestures: [createPointerHandlersGesture({ onWheel: () => true }), createZoomGesture()]
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
        const { controls } = setupCamera();
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [createPanGesture({ button: 2 })]
        });
        const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
        target.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        dispose();
        input.detach();
    });

    it('reads the latest gesture list without re-subscribing', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const gestures: { onPointerMove?: () => boolean | undefined }[] = [];
        const options = {
            input,
            controls,
            getSurface: () => null,
            gestures
        };
        const { dispose } = createInputRouter(options);
        const onPointerMove = vi.fn(() => true);
        gestures.push({ onPointerMove });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true }));
        expect(onPointerMove).toHaveBeenCalledTimes(1);
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        dispose();
        input.detach();
    });

    it('stops routing after dispose', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const { dispose } = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [createPanGesture()]
        });
        dispose();
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true }));
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        input.detach();
    });
});

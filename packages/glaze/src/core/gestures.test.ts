import { describe, expect, it, vi } from 'vitest';

import { defaultCamera, toScreenPoint } from './Camera';
import { createCameraControls } from './CameraControls';
import {
    InputRouter,
    PanGesture,
    ZoomGesture,
    createInputRouter,
    createPanGesture,
    createZoomGesture,
    type InteractionEvent
} from './gestures';
import { InputStore } from './InputStore';

interface FakeSurface {
    input: InputStore;
}

function setup() {
    const target = document.createElement('div');
    const input = new InputStore();

    input.attach(target);

    return { target, input };
}

function setupCamera(minZoom = 0.05, maxZoom = 64) {
    const camera = defaultCamera();
    const cameraControls = createCameraControls(camera, minZoom, maxZoom);

    return { camera, cameraControls };
}

function wheelEvent(init: {
    deltaY: number;
    clientX?: number;
    clientY?: number;
    bubbles?: boolean;
    cancelable?: boolean;
}) {
    const event = new WheelEvent('wheel', init);

    if (init.clientX !== undefined)
        Object.defineProperty(event, 'clientX', { value: init.clientX });

    if (init.clientY !== undefined)
        Object.defineProperty(event, 'clientY', { value: init.clientY });

    return event;
}

describe('PanGesture', () => {
    it('createPanGesture is a thin new PanGesture() wrapper', () => {
        expect(createPanGesture()).toBeInstanceOf(PanGesture);
    });

    it('tracks an explicit active drag state through onStart and onEnd', () => {
        const { input } = setup();
        const { cameraControls } = setupCamera();
        const gesture = new PanGesture();
        const event = (nativeEvent: PointerEvent): InteractionEvent<PointerEvent, FakeSurface> => ({
            nativeEvent,
            point: input.pointer,
            input,
            cameraControls,
            surface: null
        });

        expect(gesture.active).toBe(false);
        gesture.onStart(event(new PointerEvent('pointerdown', { button: 0 })));
        expect(gesture.active).toBe(true);
        gesture.onEnd();
        expect(gesture.active).toBe(false);
        input.detach();
    });

    it('does not start on a non-matching button', () => {
        const { input } = setup();
        const { cameraControls } = setupCamera();
        const gesture = new PanGesture({ button: [2] });
        const event = (nativeEvent: PointerEvent): InteractionEvent<PointerEvent, FakeSurface> => ({
            nativeEvent,
            point: input.pointer,
            input,
            cameraControls,
            surface: null
        });

        gesture.onStart(event(new PointerEvent('pointerdown', { button: 0 })));
        expect(gesture.active).toBe(false);
        input.detach();
    });
});

describe('ZoomGesture', () => {
    it('createZoomGesture is a thin new ZoomGesture() wrapper', () => {
        expect(createZoomGesture()).toBeInstanceOf(ZoomGesture);
    });
});

describe('InputRouter', () => {
    it('createInputRouter is a thin new InputRouter() wrapper', () => {
        const { input } = setup();
        const { cameraControls } = setupCamera();
        const router = createInputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: []
        });

        expect(router).toBeInstanceOf(InputRouter);
        router.dispose();
        input.detach();
    });

    it('pans the camera while dragging with the matching button', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: [new PanGesture()]
        });

        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true })
        );
        expect(camera).toEqual({ x: 20, y: 30, zoom: 1 });
        router.dispose();
        input.detach();
    });

    it('does not pan when pan is restricted to another button', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: [new PanGesture({ button: [2] })]
        });

        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true })
        );
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        router.dispose();
        input.detach();
    });

    it('releases the drag state on pointerup', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: [new PanGesture()]
        });

        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true })
        );
        expect(camera).toEqual({ x: 20, y: 30, zoom: 1 });
        target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true })
        );
        expect(camera).toEqual({ x: 20, y: 30, zoom: 1 });
        router.dispose();
        input.detach();
    });

    it('zooms around the wheel focal point and prevents default', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: [new ZoomGesture({ speed: 0.001 })]
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
        expect(camera.screenToWorld(toScreenPoint({ x: 100, y: 50 }))).toEqual({ x: 100, y: 50 });
        router.dispose();
        input.detach();
    });

    it('clamps zoom to the configured bounds', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera(0.5, 2);
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: [new ZoomGesture()]
        });

        target.dispatchEvent(
            wheelEvent({ deltaY: -100000, clientX: 100, clientY: 50, bubbles: true, cancelable: true })
        );
        expect(camera.zoom).toBe(2);
        router.dispose();
        input.detach();
    });

    it('prevents the context menu when right-button panning is enabled', () => {
        const { target, input } = setup();
        const { cameraControls } = setupCamera();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: [new PanGesture({ button: 2 })]
        });
        const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });

        target.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        router.dispose();
        input.detach();
    });

    it('reads the latest gesture list without re-subscribing', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera();
        const gestures: { onMove?: () => void }[] = [];
        const options = {
            input,
            cameraControls,
            getSurface: () => null,
            gestures
        };
        const router = new InputRouter(options);
        const onMove = vi.fn();

        gestures.push({ onMove });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true })
        );
        expect(onMove).toHaveBeenCalledTimes(1);
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        router.dispose();
        input.detach();
    });

    it('stops routing after dispose', () => {
        const { target, input } = setup();
        const { camera, cameraControls } = setupCamera();
        const router = new InputRouter({
            input,
            cameraControls,
            getSurface: () => null,
            gestures: [new PanGesture()]
        });

        router.dispose();
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true })
        );
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        input.detach();
    });
});

import { describe, expect, it, vi } from 'vitest';
import { Camera } from '../core/coords/camera';
import { createCameraControls } from '../core/coords/cameraControls';
import { InputStore } from '../cpu/createInputStore';
import {
    InputRouter,
    PanGesture,
    ZoomGesture,
    createInputRouter,
    createInteractionAdapter,
    createPanGesture,
    createZoomGesture,
    type CanvasInteractions,
    type InteractionEvent
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
    if (init.clientX !== undefined)
        Object.defineProperty(event, 'clientX', { value: init.clientX });
    if (init.clientY !== undefined)
        Object.defineProperty(event, 'clientY', { value: init.clientY });
    return event;
}

function pan(camera: Camera) {
    expect(camera).toEqual({ x: 20, y: 30, zoom: 1 });
}

describe('PanGesture', () => {
    it('createPanGesture is a thin new PanGesture() wrapper', () => {
        expect(createPanGesture()).toBeInstanceOf(PanGesture);
    });

    it('tracks an explicit active drag state through onStart and onEnd', () => {
        const { input } = setup();
        const { controls } = setupCamera();
        const gesture = new PanGesture();
        const event = (nativeEvent: PointerEvent): InteractionEvent<PointerEvent, FakeSurface> => ({
            nativeEvent,
            point: input.pointer,
            input,
            controls,
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
        const { controls } = setupCamera();
        const gesture = new PanGesture({ button: [2] });
        const event = (nativeEvent: PointerEvent): InteractionEvent<PointerEvent, FakeSurface> => ({
            nativeEvent,
            point: input.pointer,
            input,
            controls,
            surface: null
        });
        expect(gesture.onStart(event(new PointerEvent('pointerdown', { button: 0 })))).toBeUndefined();
        expect(gesture.active).toBe(false);
        input.detach();
    });
});

describe('ZoomGesture', () => {
    it('createZoomGesture is a thin new ZoomGesture() wrapper', () => {
        expect(createZoomGesture()).toBeInstanceOf(ZoomGesture);
    });
});

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
});

describe('InputRouter', () => {
    it('createInputRouter is a thin new InputRouter() wrapper', () => {
        const { input } = setup();
        const { controls } = setupCamera();
        const router = createInputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: []
        });
        expect(router).toBeInstanceOf(InputRouter);
        router.dispose();
        input.detach();
    });

    it('pans the camera while dragging with the matching button', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [new PanGesture()]
        });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true })
        );
        pan(camera);
        router.dispose();
        input.detach();
    });

    it('does not pan when a consumer gesture consumes the event', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const interactions: CanvasInteractions<FakeSurface> = {
            onStart: () => true,
            onMove: () => true
        };
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => ({ input }),
            gestures: [...createInteractionAdapter(interactions), new PanGesture()]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true })
        );
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        router.dispose();
        input.detach();
    });

    it('chains a non-consuming gesture with the default pan', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const onMove = vi.fn(() => false);
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => ({ input }),
            gestures: [...createInteractionAdapter({ onMove }), new PanGesture()]
        });
        target.dispatchEvent(
            new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 10, bubbles: true })
        );
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 30, clientY: 40, bubbles: true })
        );
        expect(onMove).toHaveBeenCalledTimes(1);
        pan(camera);
        router.dispose();
        input.detach();
    });

    it('respects panButton', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const router = new InputRouter({
            input,
            controls,
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

    it('stops the chain at the first gesture that consumes', () => {
        const { target, input } = setup();
        const { controls } = setupCamera();
        const first = { onStart: () => true };
        const second = { onStart: vi.fn() };
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [first, second]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        expect(second.onStart).not.toHaveBeenCalled();
        router.dispose();
        input.detach();
    });

    it('lets a non-consuming first gesture pass through to the next', () => {
        const { target, input } = setup();
        const { controls } = setupCamera();
        const first = { onStart: () => false };
        const second = { onStart: vi.fn(() => true) };
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [first, second]
        });
        target.dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true }));
        expect(second.onStart).toHaveBeenCalledTimes(1);
        router.dispose();
        input.detach();
    });

    it('broadcasts pointerup so released pan state resets even after a consume', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [...createInteractionAdapter({ onMove: () => false }), new PanGesture()]
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
        const { camera, controls } = setupCamera();
        const router = new InputRouter({
            input,
            controls,
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
        expect(camera.screenToWorld({ x: 100, y: 50 })).toEqual({ x: 100, y: 50 });
        router.dispose();
        input.detach();
    });

    it('clamps zoom to the configured bounds', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera(0.5, 2);
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => null,
            gestures: [new ZoomGesture()]
        });
        target.dispatchEvent(wheelEvent({ deltaY: -100000, bubbles: true, cancelable: true }));
        expect(camera.zoom).toBe(2);
        router.dispose();
        input.detach();
    });

    it('lets a consumer wheel gesture override the default zoom', () => {
        const { target, input } = setup();
        const { camera, controls } = setupCamera();
        const router = new InputRouter({
            input,
            controls,
            getSurface: () => ({ input }),
            gestures: [...createInteractionAdapter({ onZoom: () => true }), new ZoomGesture()]
        });
        target.dispatchEvent(wheelEvent({ deltaY: 100, bubbles: true, cancelable: true }));
        expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
        router.dispose();
        input.detach();
    });

    it('prevents the context menu when right-button panning is enabled', () => {
        const { target, input } = setup();
        const { controls } = setupCamera();
        const router = new InputRouter({
            input,
            controls,
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
        const { camera, controls } = setupCamera();
        const gestures: { onMove?: () => boolean | undefined }[] = [];
        const options = {
            input,
            controls,
            getSurface: () => null,
            gestures
        };
        const router = new InputRouter(options);
        const onMove = vi.fn(() => true);
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
        const { camera, controls } = setupCamera();
        const router = new InputRouter({
            input,
            controls,
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

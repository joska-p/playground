import { describe, expect, it, vi } from 'vitest';

import { defaultCamera } from './Camera';
import { createCameraControls } from './CameraControls';
import { createInputRouter, createPanGesture, createZoomGesture } from './gestures';
import {
    DEFAULT_WHEEL_SPEED,
    toScreenPoint,
    type CameraControls,
    type Gesture,
    type InteractionEvent,
    type Point2D
} from './types';
import type { InputStore } from './InputStore';

interface Surface {
    readonly kind: 'test';
}

const fakePointer = (overrides: Record<string, unknown> = {}): PointerEvent =>
    ({
        button: 0,
        pointerId: 7,
        currentTarget: null,
        ...overrides
    }) as unknown as PointerEvent;

const fakeWheel = (deltaY: number): WheelEvent =>
    ({ deltaY, preventDefault: vi.fn() }) as unknown as WheelEvent;

const interaction = <TEvent>(
    nativeEvent: TEvent,
    controls: CameraControls = createCameraControls(defaultCamera()),
    pointerDelta: Point2D = { x: 0, y: 0 }
): InteractionEvent<TEvent, Surface> => ({
    nativeEvent,
    point: toScreenPoint({ x: 5, y: 6 }),
    input: { pointerDelta } as unknown as InputStore,
    cameraControls: controls,
    surface: null
});

interface RouterHarness {
    router: ReturnType<typeof createInputRouter<Surface>>;
    fire: (name: string, ...args: unknown[]) => void;
}

const makeRouter = (gestures: Gesture<Surface>[]): RouterHarness => {
    const live: Record<string, unknown>[] = [];
    const store = {
        pointer: { x: 0, y: 0 },
        subscribe: (handlers: Record<string, unknown>) => {
            live.push(handlers);

            return () => {
                live.splice(live.indexOf(handlers), 1);
            };
        }
    } as unknown as InputStore;

    const router = createInputRouter<Surface>({
        input: store,
        cameraControls: createCameraControls(defaultCamera()),
        getSurface: () => null,
        getGestures: () => gestures
    });

    return {
        router,
        fire: (name, ...args) => {
            for (const handlers of [...live]) {
                (handlers[name] as (...a: unknown[]) => void)(...args);
            }
        }
    };
};

describe('createZoomGesture', () => {
    it('rejects degenerate speeds at construction', () => {
        expect(() => createZoomGesture({ speed: 0 })).toThrow(/^Glaze:/);
        expect(() => createZoomGesture({ speed: -0.5 })).toThrow(/^Glaze:/);
        expect(() => createZoomGesture({ speed: Number.NaN })).toThrow(/^Glaze:/);
    });

    it('zooms by exp(−deltaY · speed) around the event point', () => {
        const camera = defaultCamera();
        const gesture = createZoomGesture<Surface>({ speed: 1 });

        gesture.onZoom(interaction(fakeWheel(-1), createCameraControls(camera)));

        expect(camera.zoom).toBeCloseTo(Math.E);
    });

    it('defaults to the validated DEFAULT_WHEEL_SPEED', () => {
        const camera = defaultCamera();

        createZoomGesture<Surface>().onZoom(
            interaction(fakeWheel(-100), createCameraControls(camera))
        );

        expect(camera.zoom).toBeCloseTo(Math.exp(DEFAULT_WHEEL_SPEED * 100));
    });

    it('prevents default page scroll on the native wheel event', () => {
        const preventDefault = vi.fn();
        const wheel = { deltaY: 10, preventDefault } as unknown as WheelEvent;

        createZoomGesture<Surface>().onZoom(interaction(wheel));

        expect(preventDefault).toHaveBeenCalledTimes(1);
    });
});

describe('PanGesture decisions', () => {
    it('claims matching buttons and ignores the others', () => {
        const pan = createPanGesture<Surface>({ button: [2] });

        expect(pan.onStart(interaction(fakePointer({ button: 0 })))).toBe(false);
        expect(pan.active).toBe(false);

        expect(pan.onStart(interaction(fakePointer({ button: 2 })))).toBe(true);
        expect(pan.active).toBe(true);
    });

    it('performs no DOM side effect — capture is not its job anymore', () => {
        const setPointerCapture = vi.fn();
        const pan = createPanGesture<Surface>();

        pan.onStart(interaction(fakePointer({ currentTarget: { setPointerCapture } })));

        expect(setPointerCapture).not.toHaveBeenCalled();
    });

    it('pans by the stored pointer delta while active', () => {
        const pan = createPanGesture<Surface>();
        const camera = defaultCamera();
        const controls = createCameraControls(camera);

        pan.onStart(interaction(fakePointer()));
        pan.onMove(interaction(fakePointer(), controls, { x: 3, y: -8 }));

        expect(camera.x).toBe(3);
        expect(camera.y).toBe(-8);
    });

    it('ignores moves while inactive', () => {
        const pan = createPanGesture<Surface>();
        const camera = defaultCamera();
        const controls = createCameraControls(camera);

        pan.onMove(interaction(fakePointer(), controls, { x: 3, y: -8 }));

        expect(camera.x).toBe(0);
        expect(camera.y).toBe(0);
    });

    it('releases activation on end and on cancel alike', () => {
        const pan = createPanGesture<Surface>();

        pan.onStart(interaction(fakePointer()));
        pan.onEnd();
        expect(pan.active).toBe(false);

        pan.onStart(interaction(fakePointer()));
        pan.onCancel();
        expect(pan.active).toBe(false);
    });
});

describe('InputRouter dispatch', () => {
    it('fans every hook out to every gesture, in array order', () => {
        const calls: string[] = [];
        const recorder = (id: string): Gesture<Surface> => ({
            onStart: () => {
                calls.push(`${id}:start`);
            },
            onMove: () => {
                calls.push(`${id}:move`);
            },
            onEnd: () => {
                calls.push(`${id}:end`);
            },
            onZoom: () => {
                calls.push(`${id}:zoom`);
            },
            onContextMenu: () => {
                calls.push(`${id}:ctx`);
            }
        });
        const { fire } = makeRouter([recorder('A'), recorder('B')]);

        const point = { x: 1, y: 2 };

        fire('onPointerDown', fakePointer(), point);
        fire('onPointerMove', fakePointer(), point);
        fire('onPointerUp', fakePointer(), point);
        fire('onWheel', fakeWheel(5), point);
        fire('onContextMenu', { preventDefault: vi.fn() });

        expect(calls).toEqual([
            'A:start',
            'B:start',
            'A:move',
            'B:move',
            'A:end',
            'B:end',
            'A:zoom',
            'B:zoom',
            'A:ctx',
            'B:ctx'
        ]);
    });

    it('captures the pointer once when a gesture claims the start', () => {
        const setPointerCapture = vi.fn();
        const claiming: Gesture<Surface> = { onStart: () => true };
        const { fire } = makeRouter([claiming]);

        fire(
            'onPointerDown',
            fakePointer({ pointerId: 42, currentTarget: { setPointerCapture } }),
            { x: 0, y: 0 }
        );

        expect(setPointerCapture).toHaveBeenCalledTimes(1);
        expect(setPointerCapture).toHaveBeenCalledWith(42);
    });

    it('captures exactly once even when several gestures claim', () => {
        const setPointerCapture = vi.fn();
        const claimers: Gesture<Surface>[] = [{ onStart: () => true }, { onStart: () => true }];
        const { fire } = makeRouter(claimers);

        fire('onPointerDown', fakePointer({ currentTarget: { setPointerCapture } }), {
            x: 0,
            y: 0
        });

        expect(setPointerCapture).toHaveBeenCalledTimes(1);
    });

    it('never captures when no gesture claims', () => {
        const setPointerCapture = vi.fn();
        const bystander: Gesture<Surface> = { onStart: () => undefined };
        const { fire } = makeRouter([bystander]);

        fire('onPointerDown', fakePointer({ currentTarget: { setPointerCapture } }), {
            x: 0,
            y: 0
        });
        fire('onPointerMove', fakePointer({ currentTarget: { setPointerCapture } }), {
            x: 0,
            y: 0
        });

        expect(setPointerCapture).not.toHaveBeenCalled();
    });

    it('does not short-circuit the fan-out on a claim', () => {
        const latecomer = vi.fn();
        const gestures: Gesture<Surface>[] = [{ onStart: () => true }, { onStart: latecomer }];
        const { fire } = makeRouter(gestures);

        fire('onPointerDown', fakePointer(), { x: 0, y: 0 });

        expect(latecomer).toHaveBeenCalledTimes(1);
    });

    it('consults getGestures() at event time, so swaps apply live', () => {
        const first = vi.fn();
        const second = vi.fn();
        const gestures: Gesture<Surface>[] = [{ onStart: first }];
        const { fire } = makeRouter(gestures);

        fire('onPointerDown', fakePointer(), { x: 0, y: 0 });
        expect(first).toHaveBeenCalledTimes(1);
        expect(second).not.toHaveBeenCalled();

        gestures.push({ onStart: second });
        fire('onPointerDown', fakePointer(), { x: 0, y: 0 });

        expect(first).toHaveBeenCalledTimes(2);
        expect(second).toHaveBeenCalledTimes(1);
    });
});

describe('InputRouter dispose', () => {
    it('cancels gestures so a mid-drag unmount leaks no active state', () => {
        const onCancel = vi.fn();
        const custom: Gesture<Surface> = { onCancel };
        const harness = makeRouter([createPanGesture<Surface>(), custom]);

        harness.fire('onPointerDown', fakePointer(), { x: 0, y: 0 });

        harness.router.dispose();

        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('stops routing events after dispose', () => {
        const onMove = vi.fn();
        const harness = makeRouter([{ onMove }]);

        harness.router.dispose();
        harness.fire('onPointerMove', fakePointer(), { x: 0, y: 0 });

        expect(onMove).not.toHaveBeenCalled();
    });

    it('is safe to call twice', () => {
        const onCancel = vi.fn();
        const harness = makeRouter([{ onCancel }]);

        harness.router.dispose();
        expect(() => {
            harness.router.dispose();
        }).not.toThrow();
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});

describe('type-level guards', () => {
    it('requires branded screen points inside InteractionEvent', () => {
        const bad: InteractionEvent<PointerEvent, Surface> = {
            nativeEvent: fakePointer(),
            // @ts-expect-error a bare point does not carry the ScreenPoint proof
            point: { x: 1, y: 2 },
            input: {} as InputStore,
            cameraControls: {} as CameraControls,
            surface: null
        };

        expect(bad.input).toBeDefined();
    });
});

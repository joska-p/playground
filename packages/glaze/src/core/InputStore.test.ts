import { describe, expect, it, vi } from 'vitest';

import { createInputStore, type EventSource, type InputStore } from './InputStore';
import type { FrameToken } from './FrameLoop';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fakePointer = (overrides: Record<string, unknown> = {}): PointerEvent =>
    ({
        button: 0,
        buttons: 0,
        pointerId: 1,
        clientX: 0,
        clientY: 0,
        currentTarget: null,
        ...overrides
    }) as unknown as PointerEvent;

const fakeWheelEvent = (deltaY: number): WheelEvent =>
    ({ deltaY, clientX: 0, clientY: 0, preventDefault: vi.fn() }) as unknown as WheelEvent;

const fakeKey = (code: string): KeyboardEvent => ({ code }) as unknown as KeyboardEvent;

const fakeToken = {} as FrameToken;

// ---------------------------------------------------------------------------
// Fake EventSource
// ---------------------------------------------------------------------------

interface FakeEventSource extends EventSource {
    readonly subscriptions: { target: unknown; type: string; cb: EventListener }[];
    emit(target: unknown, type: string, event?: unknown): void;
    emitWindow(type: string, event?: unknown): void;
}

function createFakeEventSource(): FakeEventSource {
    const subscriptions: { target: unknown; type: string; cb: EventListener }[] = [];
    const source: FakeEventSource = {
        subscriptions,
        on: vi.fn((target: unknown, type: string, cb: EventListener) => {
            subscriptions.push({ target, type, cb });

            return () => {
                const idx = subscriptions.findIndex((s) => s.cb === cb);

                if (idx >= 0) subscriptions.splice(idx, 1);
            };
        }) as EventSource['on'],
        onWindow: vi.fn((type: string, cb: EventListener) => {
            subscriptions.push({ target: 'window', type, cb });

            return () => {
                const idx = subscriptions.findIndex((s) => s.cb === cb);

                if (idx >= 0) subscriptions.splice(idx, 1);
            };
        }),
        emit(target: unknown, type: string, event: unknown = {}) {
            for (const s of subscriptions) {
                if (s.target === target && s.type === type) s.cb(event as Event);
            }
        },
        emitWindow(type: string, event: unknown = {}) {
            for (const s of subscriptions) {
                if (s.target === 'window' && s.type === type) s.cb(event as Event);
            }
        }
    };

    return source;
}

const attachedStore = (
    overrides: { eventSource?: EventSource } = {}
): { store: InputStore; target: HTMLDivElement; source: FakeEventSource } => {
    const source = createFakeEventSource();
    const store = createInputStore({
        eventSource: source,
        ...overrides
    });
    const target = document.createElement('div');

    store.attach(target);

    return { store, target, source };
};

// ---------------------------------------------------------------------------
// EventSource injection
// ---------------------------------------------------------------------------

describe('EventSource injection', () => {
    it('delegates subscriptions to the injected EventSource', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');

        store.attach(target);

        expect(source.on).toHaveBeenCalledTimes(6); // eslint-disable-line @typescript-eslint/unbound-method
        expect(source.onWindow).toHaveBeenCalledTimes(2); // eslint-disable-line @typescript-eslint/unbound-method

        for (const sub of source.subscriptions) {
            expect(sub.target === target || sub.target === 'window').toBe(true);
        }
    });

    it('uses domEventSource by default (no crash without options)', () => {
        const store = createInputStore();
        const target = document.createElement('div');

        expect(() => store.attach(target)).not.toThrow();
        store.destroy();
    });
});

// ---------------------------------------------------------------------------
// Bounds injection
// ---------------------------------------------------------------------------

describe('bounds injection', () => {
    it('uses the element rect for pointer coordinate calculation', () => {
        const { store, target, source } = attachedStore();

        vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(
            DOMRect.fromRect({ x: 10, y: 20, width: 400, height: 300 })
        );

        // Re-attach so the new bounds provider picks up the mock
        store.attach(target);

        store.subscribe({ onPointerDown: vi.fn() });

        source.emit(target, 'pointerdown', fakePointer({ clientX: 25, clientY: 35, buttons: 1 }));

        expect(store.pointer).toEqual({ x: 15, y: 15 });
    });

    it('re-reads bounds on each event', () => {
        const { store, target, source } = attachedStore();
        const callCount = { n: 0 };

        vi.spyOn(target, 'getBoundingClientRect').mockImplementation(() => {
            callCount.n++;
            const left = callCount.n <= 1 ? 0 : 10;
            const top = callCount.n <= 1 ? 0 : 10;

            return DOMRect.fromRect({ x: left, y: top, width: 400, height: 300 });
        });

        store.attach(target);
        store.subscribe({ onPointerMove: vi.fn() });

        // First call: rect has left=0, top=0
        source.emit(target, 'pointermove', fakePointer({ clientX: 50, clientY: 50 }));
        expect(store.pointer).toEqual({ x: 50, y: 50 });

        // Second call: rect has left=10, top=10
        source.emit(target, 'pointermove', fakePointer({ clientX: 50, clientY: 50 }));
        expect(store.pointer).toEqual({ x: 40, y: 40 });
    });
});

// ---------------------------------------------------------------------------
// Pointer state
// ---------------------------------------------------------------------------

describe('pointer state', () => {
    it('tracks mouseDown and mouseButtons across down/up', () => {
        const { store, target, source } = attachedStore();

        expect(store.mouseDown).toBe(false);

        source.emit(target, 'pointerdown', fakePointer({ buttons: 3 }));
        expect(store.mouseDown).toBe(true);
        expect(store.mouseButtons).toBe(3);

        source.emit(target, 'pointerup', fakePointer({ buttons: 0 }));
        expect(store.mouseDown).toBe(false);
        expect(store.mouseButtons).toBe(0);
    });

    it('resets mouseButtons to 0 on cancel', () => {
        const { store, target, source } = attachedStore();

        source.emit(target, 'pointerdown', fakePointer({ buttons: 5 }));
        expect(store.mouseButtons).toBe(5);

        source.emit(target, 'pointercancel', fakePointer({ buttons: 5 }));
        expect(store.mouseDown).toBe(false);
        expect(store.mouseButtons).toBe(0);
    });

    it('computes pointerDelta across moves', () => {
        const { store, target, source } = attachedStore();

        // jsdom getBoundingClientRect returns zeros, so pointer = client - 0 = client
        source.emit(target, 'pointerdown', fakePointer({ clientX: 10, clientY: 10, buttons: 1 }));
        // First event: pointer goes from {0,0} → {10,10}, delta = {10,10}
        expect(store.pointer).toEqual({ x: 10, y: 10 });
        expect(store.pointerDelta).toEqual({ x: 10, y: 10 });

        source.emit(target, 'pointermove', fakePointer({ clientX: 15, clientY: 20, buttons: 1 }));
        // pointer = {15, 20}, delta = {15-10, 20-10} = {5, 10}
        expect(store.pointer).toEqual({ x: 15, y: 20 });
        expect(store.pointerDelta).toEqual({ x: 5, y: 10 });
    });

    it('cancel does not update pointer coordinates', () => {
        const { store, target, source } = attachedStore();

        source.emit(target, 'pointerdown', fakePointer({ clientX: 10, clientY: 10, buttons: 1 }));
        expect(store.pointer).toEqual({ x: 10, y: 10 });

        source.emit(target, 'pointercancel', fakePointer({ clientX: 99, clientY: 99 }));

        // Cancel doesn't call #updatePointer — pointer stays from the down event
        expect(store.pointer).toEqual({ x: 10, y: 10 });
    });
});

// ---------------------------------------------------------------------------
// Pointer snapshots (immutability)
// ---------------------------------------------------------------------------

describe('pointer snapshots', () => {
    it('subscribers receive a frozen point', () => {
        const { store, target, source } = attachedStore();
        const received: object[] = [];

        store.subscribe({
            onPointerDown: (_event, point) => {
                received.push(point);
            }
        });

        source.emit(target, 'pointerdown', fakePointer({ clientX: 25, clientY: 35, buttons: 1 }));

        expect(received).toHaveLength(1);
        expect(Object.isFrozen(received[0])).toBe(true);
    });

    it('each subscriber in the same notification gets the same frozen snapshot', () => {
        const { store, target, source } = attachedStore();
        const a: object[] = [];
        const b: object[] = [];

        store.subscribe({
            onPointerDown: (_e, p) => {
                a.push(p);
            }
        });
        store.subscribe({
            onPointerDown: (_e, p) => {
                b.push(p);
            }
        });

        source.emit(target, 'pointerdown', fakePointer({ clientX: 25, clientY: 35, buttons: 1 }));

        // Same notification pass → same snapshot object
        expect(a[0]).toBe(b[0]);
        expect(Object.isFrozen(a[0])).toBe(true);
    });

    it('different notifications produce different snapshot objects', () => {
        const { store, target, source } = attachedStore();
        const snapshots: object[] = [];

        store.subscribe({
            onPointerDown: (_e, p) => {
                snapshots.push(p);
            }
        });

        source.emit(target, 'pointerdown', fakePointer({ clientX: 10, clientY: 10, buttons: 1 }));
        source.emit(target, 'pointerdown', fakePointer({ clientX: 20, clientY: 20, buttons: 1 }));

        expect(snapshots).toHaveLength(2);
        expect(snapshots[0]).not.toBe(snapshots[1]);
    });

    it('snapshot captures the updated pointer state (after #updatePointer)', () => {
        const { store, target, source } = attachedStore();
        const points: { x: number; y: number }[] = [];

        store.subscribe({
            onPointerDown: (_e, p) => {
                points.push({ ...p });
            }
        });

        // jsdom getBoundingClientRect returns zeros, so pointer = clientX - 0
        source.emit(target, 'pointerdown', fakePointer({ clientX: 25, clientY: 35, buttons: 1 }));

        // Snapshot is taken after #updatePointer — it reflects the updated coordinates
        expect(points[0]).toEqual({ x: 25, y: 35 });
        expect(store.pointer).toEqual({ x: 25, y: 35 });
    });

    it('snapshot is immutable: mutating store.pointer does not retroactively change it', () => {
        const { store, target, source } = attachedStore();
        const snapshots: { x: number; y: number }[] = [];

        store.subscribe({
            onPointerDown: (_e, p) => {
                snapshots.push({ ...p });
            }
        });

        source.emit(target, 'pointerdown', fakePointer({ clientX: 10, clientY: 10, buttons: 1 }));

        expect(snapshots).toHaveLength(1);
        const before = { ...snapshots[0] };

        // Mutate the live pointer
        store.pointer.x = 999;
        store.pointer.y = 999;

        // Snapshot is frozen, so the captured value is unchanged
        expect(snapshots[0]).toEqual(before);
    });
});

// ---------------------------------------------------------------------------
// endFrame(token)
// ---------------------------------------------------------------------------

describe('endFrame(token)', () => {
    it('clears pressed keys', () => {
        const { store, source } = attachedStore();

        source.emitWindow('keydown', fakeKey('Space'));
        expect(store.wasKeyPressed('Space')).toBe(true);

        store.endFrame(fakeToken);
        expect(store.wasKeyPressed('Space')).toBe(false);
    });

    it('clears wheelDelta', () => {
        const { store, target, source } = attachedStore();

        source.emit(target, 'wheel', fakeWheelEvent(100));
        expect(store.wheelDelta).toBe(100);

        store.endFrame(fakeToken);
        expect(store.wheelDelta).toBe(0);
    });

    it('is a no-op when token is falsy', () => {
        const { store, source } = attachedStore();

        source.emitWindow('keydown', fakeKey('KeyA'));
        store.endFrame(null as unknown as FrameToken);
        expect(store.wasKeyPressed('KeyA')).toBe(true);
    });

    it('is idempotent across multiple calls', () => {
        const { store, source } = attachedStore();

        source.emitWindow('keydown', fakeKey('KeyB'));
        store.endFrame(fakeToken);
        store.endFrame(fakeToken);

        expect(store.wasKeyPressed('KeyB')).toBe(false);
        expect(store.wheelDelta).toBe(0);
    });
});

// ---------------------------------------------------------------------------
// Keyboard state
// ---------------------------------------------------------------------------

describe('keyboard state', () => {
    it('tracks key down/up lifecycle', () => {
        const { store, source } = attachedStore();

        expect(store.isKeyDown('Space')).toBe(false);

        source.emitWindow('keydown', fakeKey('Space'));
        expect(store.isKeyDown('Space')).toBe(true);

        source.emitWindow('keyup', fakeKey('Space'));
        expect(store.isKeyDown('Space')).toBe(false);
    });

    it('wasKeyPressed is set on keydown and cleared by endFrame', () => {
        const { store, source } = attachedStore();

        source.emitWindow('keydown', fakeKey('KeyX'));
        expect(store.wasKeyPressed('KeyX')).toBe(true);
        expect(store.wasKeyPressed('KeyY')).toBe(false);

        store.endFrame(fakeToken);
        expect(store.wasKeyPressed('KeyX')).toBe(false);
    });

    it('multiple keys are tracked independently', () => {
        const { store, source } = attachedStore();

        source.emitWindow('keydown', fakeKey('KeyA'));
        source.emitWindow('keydown', fakeKey('KeyB'));

        expect(store.isKeyDown('KeyA')).toBe(true);
        expect(store.isKeyDown('KeyB')).toBe(true);

        source.emitWindow('keyup', fakeKey('KeyA'));

        expect(store.isKeyDown('KeyA')).toBe(false);
        expect(store.isKeyDown('KeyB')).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// Wheel accumulation
// ---------------------------------------------------------------------------

describe('wheel accumulation', () => {
    it('accumulates deltaY across events', () => {
        const { store, target, source } = attachedStore();

        source.emit(target, 'wheel', fakeWheelEvent(10));
        source.emit(target, 'wheel', fakeWheelEvent(20));

        expect(store.wheelDelta).toBe(30);
    });

    it('records wheelPosition relative to element rect', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');

        vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(
            DOMRect.fromRect({ x: 10, y: 20, width: 400, height: 300 })
        );

        store.attach(target);
        source.emit(
            target,
            'wheel',
            Object.assign(fakeWheelEvent(5), { clientX: 25, clientY: 35 })
        );

        expect(store.wheelPosition).toEqual({ x: 15, y: 15 });
    });

    it('resets wheelDelta via endFrame(token)', () => {
        const { store, target, source } = attachedStore();

        source.emit(target, 'wheel', fakeWheelEvent(50));
        expect(store.wheelDelta).toBe(50);

        store.endFrame(fakeToken);
        expect(store.wheelDelta).toBe(0);
    });
});

// ---------------------------------------------------------------------------
// AttachedHandle lifecycle
// ---------------------------------------------------------------------------

describe('AttachedHandle lifecycle', () => {
    it('attach() returns a handle; detach(handle) unbinds listeners', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');

        const handle = store.attach(target);

        expect(source.subscriptions.length).toBe(8);
        store.detach(handle);
        expect(source.subscriptions.length).toBe(0);
    });

    it('detach(wrongHandle) is a no-op', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');

        const handle = store.attach(target);
        const wrong = {} as ReturnType<InputStore['attach']>;

        store.detach(wrong);
        expect(source.subscriptions.length).toBe(8);
        store.detach(handle);
        expect(source.subscriptions.length).toBe(0);
    });

    it('attach() re-binds: previous element subscriptions are removed', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const a = document.createElement('div');
        const b = document.createElement('div');

        store.attach(a);
        expect(source.subscriptions.length).toBe(8);

        store.attach(b);
        // Previous element subscriptions were removed via the cancel function
        const elementTargets = source.subscriptions.filter((s) => s.target instanceof HTMLElement);

        expect(elementTargets.every((s) => s.target === b)).toBe(true);
        expect(source.subscriptions.length).toBe(8);
    });

    it('destroy() unbinds everything and clears state', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');
        const onPointerDown = vi.fn();

        store.attach(target);
        store.subscribe({ onPointerDown });
        source.emitWindow('keydown', fakeKey('Space'));

        store.destroy();

        expect(source.subscriptions.length).toBe(0);
        expect(store.isKeyDown('Space')).toBe(false);

        // Firing events after destroy should not reach subscribers
        source.emit(target, 'pointerdown', fakePointer());
        expect(onPointerDown).not.toHaveBeenCalled();
    });

    it('detach after destroy is a safe no-op', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');
        const handle = store.attach(target);

        store.destroy();
        expect(() => {
            store.detach(handle);
        }).not.toThrow();
    });
});

// ---------------------------------------------------------------------------
// Table-driven bindings
// ---------------------------------------------------------------------------

describe('table-driven bindings', () => {
    it('attaches all 6 target events and 2 window events', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');

        store.attach(target);

        const targetTypes = new Set(
            source.subscriptions.filter((s) => s.target === target).map((s) => s.type)
        );

        expect(targetTypes).toEqual(
            new Set([
                'pointermove',
                'pointerdown',
                'pointerup',
                'pointercancel',
                'wheel',
                'contextmenu'
            ])
        );

        const windowTypes = source.subscriptions
            .filter((s) => s.target === 'window')
            .map((s) => s.type)
            .sort();

        expect(windowTypes).toEqual(['keydown', 'keyup']);
    });

    it('detach removes all bindings', () => {
        const source = createFakeEventSource();
        const store = createInputStore({ eventSource: source });
        const target = document.createElement('div');
        const handle = store.attach(target);

        store.detach(handle);
        expect(source.subscriptions.length).toBe(0);
    });
});

// ---------------------------------------------------------------------------
// subscribe / unsubscribe
// ---------------------------------------------------------------------------

describe('subscribe / unsubscribe', () => {
    it('subscribed handler receives events', () => {
        const { store, target, source } = attachedStore();
        const onPointerMove = vi.fn();

        store.subscribe({ onPointerMove });
        source.emit(target, 'pointermove', fakePointer());

        expect(onPointerMove).toHaveBeenCalledTimes(1);
    });

    it('unsubscribed handler does not receive events', () => {
        const { store, target, source } = attachedStore();
        const onPointerMove = vi.fn();
        const unsub = store.subscribe({ onPointerMove });

        unsub();
        source.emit(target, 'pointermove', fakePointer());

        expect(onPointerMove).not.toHaveBeenCalled();
    });

    it('events fan out to subscribers in subscription order', () => {
        const { store, target, source } = attachedStore();
        const order: string[] = [];

        store.subscribe({
            onPointerDown: () => {
                order.push('first');
            }
        });
        store.subscribe({
            onPointerDown: () => {
                order.push('second');
            }
        });

        source.emit(target, 'pointerdown', fakePointer({ buttons: 1 }));

        expect(order).toEqual(['first', 'second']);
    });
});

// ---------------------------------------------------------------------------
// Context menu
// ---------------------------------------------------------------------------

describe('context menu', () => {
    it('forwards contextmenu event to subscribers', () => {
        const { store, target, source } = attachedStore();
        const onContextMenu = vi.fn();

        store.subscribe({ onContextMenu });

        const event = { preventDefault: vi.fn() };

        source.emit(target, 'contextmenu', event);

        expect(onContextMenu).toHaveBeenCalledWith(event);
    });
});

import { describe, expect, it, vi } from 'vitest';
import { InputStore, createInputStore } from './createInputStore';

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

describe('InputStore', () => {
    it('createInputStore is a thin new InputStore() wrapper', () => {
        expect(createInputStore()).toBeInstanceOf(InputStore);
    });

    it('tracks the pointer relative to the attached target', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        target.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 120,
                clientY: 80,
                bubbles: true
            })
        );
        expect(store.pointer).toEqual({ x: 120, y: 80 });
        expect(store.pointerDelta).toEqual({ x: 120, y: 80 });
        store.detach();
    });

    it('tracks key state and clears presses at endFrame', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(store.isKeyDown('Space')).toBe(true);
        expect(store.wasKeyPressed('Space')).toBe(true);
        store.endFrame();
        expect(store.isKeyDown('Space')).toBe(true);
        expect(store.wasKeyPressed('Space')).toBe(false);
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
        expect(store.isKeyDown('Space')).toBe(false);
        store.detach();
    });

    it('tracks mouse down state and buttons', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        target.dispatchEvent(new PointerEvent('pointerdown', { buttons: 1, bubbles: true }));
        expect(store.mouseDown).toBe(true);
        expect(store.mouseButtons).toBe(1);
        target.dispatchEvent(new PointerEvent('pointerup', { buttons: 0, bubbles: true }));
        expect(store.mouseDown).toBe(false);
        expect(store.mouseButtons).toBe(0);
        store.detach();
    });

    it('ignores pointer events while detached', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        store.detach();
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true })
        );
        expect(store.pointer).toEqual({ x: 0, y: 0 });
    });

    it('destroy clears key state', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
        store.destroy();
        expect(store.isKeyDown('KeyA')).toBe(false);
        expect(store.wasKeyPressed('KeyA')).toBe(false);
    });

    it('tracks wheel delta and position, cleared at endFrame', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        target.dispatchEvent(wheelEvent({ deltaY: 120, clientX: 50, clientY: 60, bubbles: true }));
        expect(store.wheelDelta).toBe(120);
        expect(store.wheelPosition).toEqual({ x: 50, y: 60 });
        store.endFrame();
        expect(store.wheelDelta).toBe(0);
        store.detach();
    });

    it('notifies subscribers and unsubscribes', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        const a = vi.fn();
        const b = vi.fn();
        const unsubA = store.subscribe({ onPointerMove: a });
        store.subscribe({ onPointerMove: b });
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 5, clientY: 6, bubbles: true })
        );
        expect(a).toHaveBeenCalledTimes(1);
        expect(b).toHaveBeenCalledTimes(1);
        expect(a.mock.calls[0]?.[1]).toEqual({ x: 5, y: 6 });
        unsubA();
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 7, clientY: 8, bubbles: true })
        );
        expect(a).toHaveBeenCalledTimes(1);
        expect(b).toHaveBeenCalledTimes(2);
        store.detach();
    });

    it('notifies wheel and contextmenu subscribers', () => {
        const target = document.createElement('div');
        const store = new InputStore();
        store.attach(target);
        const onWheel = vi.fn();
        const onContextMenu = vi.fn();
        store.subscribe({ onWheel, onContextMenu });
        target.dispatchEvent(wheelEvent({ deltaY: 10, clientX: 3, clientY: 4, bubbles: true }));
        expect(onWheel).toHaveBeenCalledTimes(1);
        expect(onWheel.mock.calls[0]?.[1]).toEqual({ x: 3, y: 4 });
        target.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
        expect(onContextMenu).toHaveBeenCalledTimes(1);
        store.detach();
    });
});

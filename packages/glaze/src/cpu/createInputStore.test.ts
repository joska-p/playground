import { describe, expect, it } from 'vitest';
import { createInputStore } from './createInputStore';

describe('createInputStore', () => {
    it('tracks the pointer relative to the attached target', () => {
        const target = document.createElement('div');
        const store = createInputStore();
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
        const store = createInputStore();
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
        const store = createInputStore();
        store.attach(target);
        target.dispatchEvent(new PointerEvent('pointerdown', { buttons: 1, bubbles: true }));
        expect(store.mouseDown).toBe(true);
        expect(store.mouseButtons).toBe(1);
        target.dispatchEvent(new PointerEvent('pointerup', { buttons: 0, bubbles: true }));
        expect(store.mouseDown).toBe(false);
        expect(store.mouseButtons).toBe(0);
        store.detach();
    });

    it('converts the pointer to world position through the camera', () => {
        const target = document.createElement('div');
        const store = createInputStore();
        store.attach(target);
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 20, clientY: 30, bubbles: true })
        );
        expect(store.getPointerWorldPos({ x: 0, y: 0, zoom: 1 })).toEqual({ x: 20, y: 30 });
        expect(store.getPointerWorldPos({ x: 10, y: 10, zoom: 2 })).toEqual({
            x: 5,
            y: 10
        });
        store.detach();
    });

    it('ignores pointer events while detached', () => {
        const target = document.createElement('div');
        const store = createInputStore();
        store.attach(target);
        store.detach();
        target.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 50, clientY: 50, bubbles: true })
        );
        expect(store.pointer).toEqual({ x: 0, y: 0 });
    });

    it('destroy clears key state', () => {
        const target = document.createElement('div');
        const store = createInputStore();
        store.attach(target);
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
        store.destroy();
        expect(store.isKeyDown('KeyA')).toBe(false);
        expect(store.wasKeyPressed('KeyA')).toBe(false);
    });
});

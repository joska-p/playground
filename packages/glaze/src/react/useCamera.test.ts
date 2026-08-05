import { describe, expect, it, vi } from 'vitest';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { screenToWorld } from '../core/coords/camera';
import { createCamera } from './useCamera';

const pointerEvent = (partial: Partial<ReactPointerEvent<HTMLCanvasElement>> = {}): ReactPointerEvent<HTMLCanvasElement> =>
  ({
    pointerId: 1,
    movementX: 0,
    movementY: 0,
    currentTarget: { setPointerCapture: vi.fn(), releasePointerCapture: vi.fn() },
    ...partial
  }) as unknown as ReactPointerEvent<HTMLCanvasElement>;

describe('createCamera', () => {
  it('defaults to identity camera', () => {
    const { camera } = createCamera();
    expect(camera).toEqual({ x: 0, y: 0, zoom: 1 });
  });

  it('honors initial pan and zoom', () => {
    const { camera } = createCamera({ pan: { x: 10, y: 20 }, zoom: 2 });
    expect(camera).toEqual({ x: 10, y: 20, zoom: 2 });
  });

  it('panTo sets the pan offset', () => {
    const { camera, controls } = createCamera();
    controls.panTo({ x: 40, y: -8 });
    expect(camera).toEqual({ x: 40, y: -8, zoom: 1 });
  });

  it('zoomTo clamps to minZoom/maxZoom', () => {
    const { camera, controls } = createCamera({ minZoom: 0.5, maxZoom: 2 });
    controls.zoomTo(100);
    expect(camera.zoom).toBe(2);
    controls.zoomTo(0);
    expect(camera.zoom).toBe(0.5);
  });

  it('zoomTo about a focal point keeps the world point under it fixed', () => {
    const { camera, controls } = createCamera();
    const focal = { x: 200, y: 150 };
    const worldBefore = screenToWorld({ x: 0, y: 0, zoom: 1 })(focal);
    controls.zoomTo(2, focal);
    expect(screenToWorld(camera)(focal)).toEqual(worldBefore);
  });

  it('reset restores the initial camera', () => {
    const { camera, controls } = createCamera({ pan: { x: 5, y: 6 }, zoom: 3 });
    controls.panTo({ x: 100, y: 100 });
    controls.zoomTo(0.1);
    controls.reset();
    expect(camera).toEqual({ x: 5, y: 6, zoom: 3 });
  });

  it('update merges partial camera state', () => {
    const { camera, controls } = createCamera();
    controls.update({ zoom: 4, x: 7 });
    expect(camera).toEqual({ x: 7, y: 0, zoom: 4 });
  });

  it('bindGestures pointer drag pans the camera', () => {
    const { camera, controls } = createCamera();
    const handlers = controls.bindGestures();
    handlers.onPointerDown(pointerEvent({ pointerId: 2 }));
    handlers.onPointerMove(pointerEvent({ movementX: 30, movementY: -10 }));
    handlers.onPointerMove(pointerEvent({ movementX: 5, movementY: 2 }));
    expect(camera).toEqual({ x: 35, y: -8, zoom: 1 });
  });

  it('bindGestures ignores moves when not dragging', () => {
    const { camera, controls } = createCamera();
    const handlers = controls.bindGestures();
    handlers.onPointerMove(pointerEvent({ movementX: 30, movementY: 0 }));
    expect(camera.x).toBe(0);
  });

  it('bindGestures with pan disabled does not start dragging', () => {
    const { camera, controls } = createCamera();
    const handlers = controls.bindGestures({ pan: false, zoom: true });
    handlers.onPointerDown(pointerEvent());
    handlers.onPointerMove(pointerEvent({ movementX: 12, movementY: 0 }));
    expect(camera.x).toBe(0);
  });

  it('attachWheel zooms about the pointer via a non-passive listener', () => {
    const { camera, controls } = createCamera({ minZoom: 0.5, maxZoom: 4 });
    const target = document.createElement('div');
    const detach = controls.attachWheel(target);
    const event = new WheelEvent('wheel', { deltaY: -100, clientX: 200, clientY: 150, cancelable: true });
    target.dispatchEvent(event);
    expect(camera.zoom).toBeGreaterThan(1);
    expect(event.defaultPrevented).toBe(true);
    detach();
  });

  it('attachWheel clamps the zoom factor', () => {
    const { camera, controls } = createCamera({ minZoom: 0.5, maxZoom: 4 });
    const target = document.createElement('div');
    const detach = controls.attachWheel(target);
    target.dispatchEvent(new WheelEvent('wheel', { deltaY: -100000, cancelable: true }));
    expect(camera.zoom).toBe(4);
    target.dispatchEvent(new WheelEvent('wheel', { deltaY: 100000, cancelable: true }));
    expect(camera.zoom).toBe(0.5);
    detach();
  });
});

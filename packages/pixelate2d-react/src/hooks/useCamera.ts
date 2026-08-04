import { type Camera, type Vec2, clamp, screenToWorld } from '@repo/pixelate2d-math';
import { type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent, useState } from 'react';

export type CameraOptions = {
  zoom?: number;
  pan?: Vec2;
  minZoom?: number;
  maxZoom?: number;
};

export type GestureHandlers = {
  onPointerDown: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
  onPointerCancel: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
  onWheel: (event: ReactWheelEvent<HTMLCanvasElement>) => void;
};

export type CameraControls = {
  panTo(position: Vec2): void;
  zoomTo(zoom: number, focalPoint?: Vec2): void;
  reset(): void;
  update(partial: Partial<Camera>): void;
  /** Pointer pan + wheel zoom handlers for spreading onto a canvas. */
  bindGestures(options?: { pan?: boolean; zoom?: boolean }): GestureHandlers;
  /**
   * Native wheel listener (non-passive) so zoom can `preventDefault` reliably —
   * React attaches `wheel` passively, which silently drops `preventDefault`.
   */
  attachWheel(target: HTMLElement): () => void;
};

type CameraRef = { current: Camera };
type Bounds = { minZoom: number; maxZoom: number };

function zoomAt(camera: Camera, focalPoint: Vec2, nextZoom: number): void {
  const world = screenToWorld(camera)(focalPoint);
  camera.x = focalPoint.x - world.x * nextZoom;
  camera.y = focalPoint.y - world.y * nextZoom;
  camera.zoom = nextZoom;
}

function createCameraControls(cameraRef: CameraRef, bounds: Bounds, initial: Camera): CameraControls {
  const dragging = { active: false };
  const clampZoom = (zoom: number): number => clamp(bounds.minZoom)(bounds.maxZoom)(zoom);

  const handleWheel = (event: { deltaY: number; clientX: number; clientY: number; preventDefault: () => void; target: EventTarget | null }): void => {
    event.preventDefault();
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const focalPoint = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const camera = cameraRef.current;
    zoomAt(camera, focalPoint, clampZoom(camera.zoom * Math.exp(-event.deltaY * 0.002)));
  };

  return {
    panTo(position: Vec2): void {
      const camera = cameraRef.current;
      camera.x = position.x;
      camera.y = position.y;
    },

    zoomTo(zoom: number, focalPoint?: Vec2): void {
      const next = clampZoom(zoom);
      if (focalPoint) {
        zoomAt(cameraRef.current, focalPoint, next);
      } else {
        cameraRef.current.zoom = next;
      }
    },

    reset(): void {
      const camera = cameraRef.current;
      camera.x = initial.x;
      camera.y = initial.y;
      camera.zoom = initial.zoom;
    },

    update(partial: Partial<Camera>): void {
      Object.assign(cameraRef.current, partial);
    },

    bindGestures(options: { pan?: boolean; zoom?: boolean } = {}): GestureHandlers {
      const pan = options.pan ?? true;
      const zoom = options.zoom ?? true;
      return {
        onPointerDown(event: ReactPointerEvent<HTMLCanvasElement>): void {
          if (!pan) return;
          dragging.active = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        },
        onPointerMove(event: ReactPointerEvent<HTMLCanvasElement>): void {
          if (!dragging.active) return;
          const camera = cameraRef.current;
          camera.x += event.movementX;
          camera.y += event.movementY;
        },
        onPointerUp(): void {
          dragging.active = false;
        },
        onPointerCancel(): void {
          dragging.active = false;
        },
        onWheel(event: ReactWheelEvent<HTMLCanvasElement>): void {
          if (!zoom) return;
          handleWheel(event);
        },
      };
    },

    attachWheel(target: HTMLElement): () => void {
      const listener = (event: WheelEvent): void => {
        handleWheel(event);
      };
      target.addEventListener('wheel', listener, { passive: false });
      return () => {
        target.removeEventListener('wheel', listener);
      };
    },
  };
}

/**
 * A mutable pan/zoom camera plus imperative controls. The camera object
 * identity is stable across renders and is mutated in place by gestures, so
 * the engine reads live state every frame with zero re-renders.
 */
export function useCamera(options: CameraOptions = {}): [Camera, CameraControls] {
  const [camera] = useState<Camera>(() => ({ x: options.pan?.x ?? 0, y: options.pan?.y ?? 0, zoom: options.zoom ?? 1 }));
  const [controls] = useState<CameraControls>(() =>
    createCameraControls(
      { current: camera },
      { minZoom: options.minZoom ?? 0.05, maxZoom: options.maxZoom ?? 64 },
      { ...camera },
    ),
  );
  return [camera, controls];
}

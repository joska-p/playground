import { useState } from 'react';
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from 'react';
import { screenToWorld, type Camera, type Point2D } from '../core/coords/camera';

export type CameraOptions = {
  zoom?: number;
  pan?: Point2D;
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
  panTo(position: Point2D): void;
  zoomTo(zoom: number, focalPoint?: Point2D): void;
  reset(): void;
  update(partial: Partial<Camera>): void;
  bindGestures(options?: { pan?: boolean; zoom?: boolean }): GestureHandlers;
  attachWheel(target: HTMLElement): () => void;
};

export type CameraHandle = {
  camera: Camera;
  controls: CameraControls;
};

type WheelEventLike = {
  deltaY: number;
  clientX: number;
  clientY: number;
  preventDefault: () => void;
  target: EventTarget | null;
};

const clampZoom = (min: number, max: number) => (zoom: number): number =>
  Math.max(min, Math.min(max, zoom));

function zoomAt(camera: Camera, focalPoint: Point2D, nextZoom: number): void {
  const world = screenToWorld(camera)(focalPoint);
  camera.x = focalPoint.x - world.x * nextZoom;
  camera.y = focalPoint.y - world.y * nextZoom;
  camera.zoom = nextZoom;
}

function createCameraControls(camera: Camera, minZoom: number, maxZoom: number, initial: Camera): CameraControls {
  const dragging = { active: false };
  const clamp = clampZoom(minZoom, maxZoom);

  const handleWheel = (event: WheelEventLike): void => {
    event.preventDefault();
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const focalPoint = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    zoomAt(camera, focalPoint, clamp(camera.zoom * Math.exp(-event.deltaY * 0.002)));
  };

  return {
    panTo(position: Point2D): void {
      camera.x = position.x;
      camera.y = position.y;
    },

    zoomTo(zoom: number, focalPoint?: Point2D): void {
      const next = clamp(zoom);
      if (focalPoint) zoomAt(camera, focalPoint, next);
      else camera.zoom = next;
    },

    reset(): void {
      camera.x = initial.x;
      camera.y = initial.y;
      camera.zoom = initial.zoom;
    },

    update(partial: Partial<Camera>): void {
      Object.assign(camera, partial);
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
        }
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
    }
  };
}

export function createCamera(options: CameraOptions = {}): CameraHandle {
  const camera: Camera = {
    x: options.pan?.x ?? 0,
    y: options.pan?.y ?? 0,
    zoom: options.zoom ?? 1
  };
  const controls = createCameraControls(camera, options.minZoom ?? 0.05, options.maxZoom ?? 64, { ...camera });
  return { camera, controls };
}

export function useCamera(options: CameraOptions = {}): [Camera, CameraControls] {
  const [handle] = useState(() => createCamera(options));
  return [handle.camera, handle.controls];
}

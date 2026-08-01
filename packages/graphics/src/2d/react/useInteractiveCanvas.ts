import { useEffect, useRef } from 'react';
import type { Point2D as Point } from '../transforms';

export type CanvasInteractionState = {
  pan: Point;
  zoom: number;
  pointer: Point;
  isPanning: boolean;
};

export type InteractiveCanvasOptions = {
  minZoom?: number | undefined;
  maxZoom?: number | undefined;
  zoomToCursor?: boolean | undefined;
  scalePanWithZoom?: boolean | undefined;
  zoomSpeed?: number | undefined;
};

export function useInteractiveCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  enabled = true,
  options: InteractiveCanvasOptions = {}
) {
  const interactionStateRef = useRef<CanvasInteractionState>({
    pan: { x: 0, y: 0 },
    zoom: 1,
    pointer: { x: 0, y: 0 },
    isPanning: false
  });

  const dragStart = useRef<Point | null>(null);
  const panStart = useRef<Point>({ x: 0, y: 0 });

  const minZoom = options.minZoom ?? 0.1;
  const maxZoom = options.maxZoom ?? 5;
  const zoomToCursor = options.zoomToCursor ?? false;
  const scalePanWithZoom = options.scalePanWithZoom ?? false;
  const zoomSpeed = options.zoomSpeed ?? 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    let hasPointer = false;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 1) return;
      // Middle button only for panning
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { ...interactionStateRef.current.pan };
      interactionStateRef.current.isPanning = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const pointer = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };

      if (dragStart.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        // Scale the drag delta by 1/zoom so the fractal tracks the cursor 1:1.
        const scale = scalePanWithZoom ? 1 / interactionStateRef.current.zoom : 1;
        interactionStateRef.current.pan = {
          x: panStart.current.x + dx * scale,
          y: panStart.current.y + dy * scale
        };
      }
      hasPointer = true;
      interactionStateRef.current.pointer = pointer;
    };

    const handlePointerUp = () => {
      dragStart.current = null;
      interactionStateRef.current.isPanning = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const state = interactionStateRef.current;
      const zoomFactor = Math.exp(-e.deltaY / zoomSpeed);
      const nextZoom = Math.max(minZoom, Math.min(maxZoom, state.zoom * zoomFactor));
      if (nextZoom === state.zoom) return;

      if (zoomToCursor && hasPointer) {
        const bounds = canvas.getBoundingClientRect();
        const n = {
          x: state.pointer.x / bounds.width,
          y: state.pointer.y / bounds.height
        };
        const scale = 1 / state.zoom - 1 / nextZoom;
        state.pan.x -= (n.x - 0.5) * scale * bounds.width;
        state.pan.y -= (n.y - 0.5) * scale * bounds.height;
      }
      state.zoom = nextZoom;
    };

    // Attach all event listeners natively on the canvas element
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove); // Window allows dragging outside canvas
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [canvasRef, enabled, minZoom, maxZoom, zoomToCursor, scalePanWithZoom, zoomSpeed]);

  return interactionStateRef;
}

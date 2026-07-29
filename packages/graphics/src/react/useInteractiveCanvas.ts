import { useEffect, useRef } from 'react';
import type { Point2D as Point } from '../math/transforms';

export type CanvasInteractionState = {
  pan: Point;
  zoom: number;
  pointer: Point;
  isPanning: boolean;
};

export function useInteractiveCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  // Store interaction state in refs to avoid React re-render thrashing on mouse move!
  const stateRef = useRef<CanvasInteractionState>({
    pan: { x: 0, y: 0 },
    zoom: 1,
    pointer: { x: 0, y: 0 },
    isPanning: false
  });

  const dragStart = useRef<Point | null>(null);
  const panStart = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 1 && e.button !== 2) return;
      // Right or middle click for panning
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { ...stateRef.current.pan };
      stateRef.current.isPanning = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const pointer = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };

      if (dragStart.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        stateRef.current.pan = {
          x: panStart.current.x + dx,
          y: panStart.current.y + dy
        };
      }
      stateRef.current.pointer = pointer;
    };

    const handlePointerUp = () => {
      dragStart.current = null;
      stateRef.current.isPanning = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = Math.exp(-e.deltaY / 500);
      const currentZoom = stateRef.current.zoom;
      stateRef.current.zoom = Math.max(0.1, Math.min(5, currentZoom * zoomFactor));
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
  }, [canvasRef]);

  // Return mutable ref for render loops (0 re-renders!)
  return stateRef;
}

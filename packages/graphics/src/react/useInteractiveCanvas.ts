import { useCallback, useEffect, useRef, useState } from 'react';
import type { Point2D as Point } from '../math/transforms';

export type CanvasInteractionState = {
  pan: Point;
  zoom: number;
  pointer: Point;
  isPanning: boolean;
};

export function useInteractiveCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [state, setState] = useState<CanvasInteractionState>({
    pan: { x: 0, y: 0 },
    zoom: 1,
    pointer: { x: 0, y: 0 },
    isPanning: false
  });

  const dragStart = useRef<Point | null>(null);
  const panStart = useRef<Point>({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button === 2 || e.button === 1) {
        dragStart.current = { x: e.clientX, y: e.clientY };
        panStart.current = { ...state.pan };
        setState((s) => ({ ...s, isPanning: true }));
      }
    },
    [state.pan]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      const pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };

      if (dragStart.current) {
        const dx = event.clientX - dragStart.current.x;
        const dy = event.clientY - dragStart.current.y;
        setState((prev) => ({
          ...prev,
          pan: { x: panStart.current.x + dx, y: panStart.current.y + dy },
          pointer
        }));
      } else {
        setState((prev) => ({ ...prev, pointer }));
      }
    },
    [canvasRef]
  );

  const handlePointerUp = useCallback(() => {
    dragStart.current = null;
    setState((prev) => ({ ...prev, isPanning: false }));
  }, []);

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    const zoomFactor = Math.exp(-event.deltaY / 500);
    setState((prev) => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(5, prev.zoom * zoomFactor))
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false
    });
    return () => {
      canvas.removeEventListener('wheel', handleWheel as unknown as EventListener);
    };
  }, [canvasRef, handleWheel]);

  return {
    ...state,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp
  };
}

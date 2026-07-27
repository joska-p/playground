import { useCallback, useEffect, useRef, useState } from 'react';
import type { Point } from '../math/SpaceMapper';

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
    (e: React.PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (dragStart.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setState((s) => ({
          ...s,
          pan: { x: panStart.current.x + dx, y: panStart.current.y + dy },
          pointer
        }));
      } else {
        setState((s) => ({ ...s, pointer }));
      }
    },
    [canvasRef]
  );

  const handlePointerUp = useCallback(() => {
    dragStart.current = null;
    setState((s) => ({ ...s, isPanning: false }));
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = Math.exp(-e.deltaY / 500);
    setState((s) => ({
      ...s,
      zoom: Math.max(0.1, Math.min(5, s.zoom * factor))
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

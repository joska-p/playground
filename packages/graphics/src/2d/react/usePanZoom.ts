import { useEffect, useRef, type RefObject } from 'react';
import type { Point2D } from '../transforms';

export type PanZoomState = {
  pan: Point2D;
  zoom: number;
  pointer: Point2D;
  isPanning: boolean;
};

export type CanvasView = {
  pan: Point2D;
  zoom: number;
  canvasWidth: number;
  canvasHeight: number;
};

export type PanZoomOptions = {
  minZoom?: number | undefined;
  maxZoom?: number | undefined;
  zoomToCursor?: boolean | undefined;
  scalePanWithZoom?: boolean | undefined;
  zoomSpeed?: number | undefined;
  initialView?: { pan: Point2D; zoom: number } | undefined;
  onChange?: ((view: CanvasView) => void) | undefined;
};

export function usePanZoom(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: PanZoomOptions = {}
): RefObject<PanZoomState> {
  const panZoomRef = useRef<PanZoomState>({
    pan: options.initialView?.pan ?? { x: 0, y: 0 },
    zoom: options.initialView?.zoom ?? 1,
    pointer: { x: 0, y: 0 },
    isPanning: false
  });

  const onChangeRef = useRef(options.onChange);

  useEffect(() => {
    onChangeRef.current = options.onChange;
  });

  const dragStart = useRef<Point2D | null>(null);
  const panStart = useRef<Point2D>({ x: 0, y: 0 });

  const minZoom = options.minZoom ?? 0.1;
  const maxZoom = options.maxZoom ?? 5;
  const zoomToCursor = options.zoomToCursor ?? false;
  const scalePanWithZoom = options.scalePanWithZoom ?? false;
  const zoomSpeed = options.zoomSpeed ?? 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let hasPointer = false;

    const reportView = () => {
      onChangeRef.current?.({
        pan: panZoomRef.current.pan,
        zoom: panZoomRef.current.zoom,
        canvasWidth: canvas.clientWidth,
        canvasHeight: canvas.clientHeight
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 1) return;
      // Middle button only for panning
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { ...panZoomRef.current.pan };
      panZoomRef.current.isPanning = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const pointer = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };

      if (dragStart.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const scale = scalePanWithZoom ? 1 / panZoomRef.current.zoom : 1;
        panZoomRef.current.pan = {
          x: panStart.current.x + dx * scale,
          y: panStart.current.y + dy * scale
        };
        reportView();
      }
      hasPointer = true;
      panZoomRef.current.pointer = pointer;
    };

    const handlePointerUp = () => {
      dragStart.current = null;
      panZoomRef.current.isPanning = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const state = panZoomRef.current;
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
      reportView();
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [canvasRef, minZoom, maxZoom, zoomToCursor, scalePanWithZoom, zoomSpeed]);

  return panZoomRef;
}

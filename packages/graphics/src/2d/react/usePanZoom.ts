import { useEffect, useRef, type RefObject } from 'react';
import { createCanvasToNormalized, createScreenToCanvas, type Point2D } from '../transforms';

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

  const minZoom = options.minZoom ?? 0.1;
  const maxZoom = options.maxZoom ?? 5;
  const zoomToCursor = options.zoomToCursor ?? false;
  const scalePanWithZoom = options.scalePanWithZoom ?? false;
  const zoomSpeed = options.zoomSpeed ?? 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent browser default pan/zoom
    canvas.style.touchAction = 'none';

    // Cache of active pointers (pointerId → event)
    const pointers = new Map<number, PointerEvent>();

    // Single-finger / middle-button pan state
    let dragStart: Point2D | null = null;
    let panStart: Point2D = { x: 0, y: 0 };

    // Two-finger pinch state
    let prevPinchDist = -1;
    let pinchMidpoint: Point2D | null = null;

    const reportView = () => {
      onChangeRef.current?.({
        pan: panZoomRef.current.pan,
        zoom: panZoomRef.current.zoom,
        canvasWidth: canvas.clientWidth,
        canvasHeight: canvas.clientHeight
      });
    };

    const getMidpoint = (a: PointerEvent, b: PointerEvent): Point2D => ({
      x: (a.clientX + b.clientX) / 2,
      y: (a.clientY + b.clientY) / 2
    });

    const getDistance = (a: PointerEvent, b: PointerEvent) =>
      Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

    const handlePointerDown = (e: PointerEvent) => {
      // Capture so we keep receiving events even if the pointer leaves the canvas
      canvas.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, e);

      if (pointers.size === 1) {
        // Single pointer → start pan (touch or middle mouse)
        const isMiddle = e.pointerType === 'mouse' && e.button === 1;
        const isTouch = e.pointerType === 'touch';
        if (isMiddle || isTouch) {
          dragStart = { x: e.clientX, y: e.clientY };
          panStart = { ...panZoomRef.current.pan };
          panZoomRef.current.isPanning = true;
        }
      } else if (pointers.size === 2) {
        // Second finger → start pinch, cancel any single-finger pan
        dragStart = null;
        panZoomRef.current.isPanning = false;
        const [p1, p2] = [...pointers.values()];
        if (!p1 || !p2) return;
        prevPinchDist = getDistance(p1, p2);
        pinchMidpoint = getMidpoint(p1, p2);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const pointer = createScreenToCanvas(bounds)({ x: e.clientX, y: e.clientY });
      panZoomRef.current.pointer = pointer;

      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, e); // update cached position

      // ── Single-finger / middle-button pan ──────────────────────────
      if (dragStart && pointers.size === 1) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        const scale = scalePanWithZoom ? 1 / panZoomRef.current.zoom : 1;
        panZoomRef.current.pan = {
          x: panStart.x + dx * scale,
          y: panStart.y + dy * scale
        };
        reportView();
        return;
      }

      // ── Two-finger pinch + pan ─────────────────────────────────────
      if (pointers.size === 2) {
        const [p1, p2] = [...pointers.values()];
        if (!p1 || !p2) return;
        const curDist = getDistance(p1, p2);
        const mid = getMidpoint(p1, p2);

        if (prevPinchDist > 0) {
          // Zoom factor from change in distance
          const zoomFactor = curDist / prevPinchDist;
          const state = panZoomRef.current;
          const nextZoom = Math.max(minZoom, Math.min(maxZoom, state.zoom * zoomFactor));

          if (nextZoom !== state.zoom) {
            // Zoom around the midpoint of the two fingers
            const midCanvas = createScreenToCanvas(bounds)(mid);
            const midNorm = createCanvasToNormalized(bounds.width, bounds.height)(midCanvas);

            const scale = 1 / state.zoom - 1 / nextZoom;
            state.pan.x -= (midNorm.x - 0.5) * scale * bounds.width;
            state.pan.y -= (midNorm.y - 0.5) * scale * bounds.height;
            state.zoom = nextZoom;
          }

          // Also pan by the movement of the midpoint
          if (pinchMidpoint) {
            const dx = mid.x - pinchMidpoint.x;
            const dy = mid.y - pinchMidpoint.y;
            const panScale = scalePanWithZoom ? 1 / state.zoom : 1;
            state.pan.x += dx * panScale;
            state.pan.y += dy * panScale;
          }

          reportView();
        }

        prevPinchDist = curDist;
        pinchMidpoint = mid;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      canvas.releasePointerCapture(e.pointerId);
      pointers.delete(e.pointerId);

      if (pointers.size < 2) {
        prevPinchDist = -1;
        pinchMidpoint = null;
      }

      if (pointers.size === 0) {
        dragStart = null;
        panZoomRef.current.isPanning = false;
      } else if (pointers.size === 1) {
        // One finger left → resume single-finger pan from current position
        const remaining = [...pointers.values()][0];
        if (!remaining) return;
        dragStart = { x: remaining.clientX, y: remaining.clientY };
        panStart = { ...panZoomRef.current.pan };
        panZoomRef.current.isPanning = true;
      }
    };

    // Wheel zoom (unchanged, still works with mouse / trackpad)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const state = panZoomRef.current;
      const zoomFactor = Math.exp(-e.deltaY / zoomSpeed);
      const nextZoom = Math.max(minZoom, Math.min(maxZoom, state.zoom * zoomFactor));
      if (nextZoom === state.zoom) return;

      if (zoomToCursor) {
        const bounds = canvas.getBoundingClientRect();
        const pointerNormalized = createCanvasToNormalized(
          bounds.width,
          bounds.height
        )(state.pointer);
        const scale = 1 / state.zoom - 1 / nextZoom;
        state.pan.x -= (pointerNormalized.x - 0.5) * scale * bounds.width;
        state.pan.y -= (pointerNormalized.y - 0.5) * scale * bounds.height;
      }
      state.zoom = nextZoom;
      reportView();
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp); // safety
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.style.touchAction = '';
    };
  }, [canvasRef, minZoom, maxZoom, zoomToCursor, scalePanWithZoom, zoomSpeed]);

  return panZoomRef;
}

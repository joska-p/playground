import type { Gesture, InteractionEvent, PanOptions, ZoomOptions } from '../core/gestures';
import { PanGesture, ZoomGesture } from '../core/gestures';

/**
 * `InteractionEvent` with a non-null `surface` — the pipeline only routes events while a surface is
 * mounted.
 */
export interface LiveInteractionEvent<TEvent, TSurface> extends Omit<
    InteractionEvent<TEvent, TSurface>,
    'surface'
> {
    surface: TSurface;
}

/**
 * `onStart` / `onMove` / `onZoom` replace the built-in pan/zoom; `onEnd` / `onContextMenu` run
 * alongside, so drag state always gets released. `pan` / `zoom` configure the built-ins (`false`
 * disables).
 */
export interface CanvasInteractions<TSurface> {
    pan?: boolean | PanOptions;
    zoom?: boolean | ZoomOptions;
    onStart?: (event: LiveInteractionEvent<PointerEvent, TSurface>) => void;
    onMove?: (event: LiveInteractionEvent<PointerEvent, TSurface>) => void;
    onEnd?: (event: LiveInteractionEvent<PointerEvent, TSurface>) => void;
    onZoom?: (event: LiveInteractionEvent<WheelEvent, TSurface>) => void;
    onContextMenu?: (event: LiveInteractionEvent<MouseEvent, TSurface>) => void;
}

function withSurface<TEvent, TSurface>(
    event: InteractionEvent<TEvent, TSurface>,
    run: (event: LiveInteractionEvent<TEvent, TSurface>) => void
): void {
    if (event.surface) run({ ...event, surface: event.surface });
}

export function createInteractionAdapter<TSurface>(
    interactions: CanvasInteractions<TSurface> = {}
): Gesture<TSurface>[] {
    const gestures: Gesture<TSurface>[] = [];

    const lifecycle: Gesture<TSurface> = {};
    if (interactions.onStart)
        lifecycle.onStart = (event: InteractionEvent<PointerEvent, TSurface>) => {
            withSurface(event, (e) => interactions.onStart?.(e));
        };
    if (interactions.onMove)
        lifecycle.onMove = (event: InteractionEvent<PointerEvent, TSurface>) => {
            withSurface(event, (e) => interactions.onMove?.(e));
        };
    if (interactions.onZoom)
        lifecycle.onZoom = (event: InteractionEvent<WheelEvent, TSurface>) => {
            withSurface(event, (e) => interactions.onZoom?.(e));
        };
    if (interactions.onEnd)
        lifecycle.onEnd = (event: InteractionEvent<PointerEvent, TSurface>) => {
            withSurface(event, (e) => interactions.onEnd?.(e));
        };
    if (interactions.onContextMenu)
        lifecycle.onContextMenu = (event: InteractionEvent<MouseEvent, TSurface>) => {
            withSurface(event, (e) => interactions.onContextMenu?.(e));
        };

    if (
        lifecycle.onStart ||
        lifecycle.onMove ||
        lifecycle.onEnd ||
        lifecycle.onZoom ||
        lifecycle.onContextMenu
    ) {
        gestures.push(lifecycle);
    }

    if (!interactions.onStart && !interactions.onMove && interactions.pan !== false)
        gestures.push(new PanGesture(typeof interactions.pan === 'object' ? interactions.pan : {}));
    if (!interactions.onZoom && interactions.zoom !== false)
        gestures.push(
            new ZoomGesture(typeof interactions.zoom === 'object' ? interactions.zoom : {})
        );

    return gestures;
}

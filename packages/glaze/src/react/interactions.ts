import type { Gesture, InteractionEvent, PanOptions, ZoomOptions } from '../core/gestures';
import { PanGesture, ZoomGesture } from '../core/gestures';

/**
 * An interaction event for a mounted surface. The pipeline only routes events while a surface is
 * mounted, so consumer handlers receive this — `surface` is always present and needs no defensive
 * check.
 */
export interface LiveInteractionEvent<TEvent, TSurface> extends Omit<
    InteractionEvent<TEvent, TSurface>,
    'surface'
> {
    surface: TSurface;
}

/**
 * The consumer-facing interaction config. Physical events map onto readable action cycles:
 * `pointerdown` -> `onStart`, `pointermove` -> `onMove`, `pointerup` / `pointercancel` -> `onEnd`,
 * `wheel` -> `onZoom`.
 *
 * Handlers replace the built-in gestures: providing `onStart` or `onMove` turns the default pan off
 * (you own the drag cycle — drive the camera with `event.cameraControls` if you want it to pan),
 * and providing `onZoom` turns the default zoom off. `onEnd` and `onContextMenu` are delivered in
 * addition to the built-ins, so captured state (like an active drag) is always released. `pan` /
 * `zoom` configure the built-in gestures; `false` turns one off, an options object configures it,
 * and omitting it keeps the default behavior.
 *
 * Handlers only fire while a surface is mounted, so they receive a `LiveInteractionEvent` whose
 * `surface` is always present.
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

/**
 * Adapts the consumer `CanvasInteractions` config into the pipeline. Custom lifecycle handlers are
 * wrapped to receive a live surface and replace the matching built-in gesture: `onStart` / `onMove`
 * suppress pan, `onZoom` suppresses zoom. `onEnd` / `onContextMenu` run alongside the built-ins.
 *
 * @param interactions
 */
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

import { PanGesture, ZoomGesture } from '../core/gestures';
import type { Gesture, InteractionEvent } from '../core/gestures';
import type { LiveInteractionEvent, CanvasInteractions } from './useInteractionAdapter';

export type { LiveInteractionEvent, CanvasInteractions };

function withSurface<TEvent, TSurface>(
    event: InteractionEvent<TEvent, TSurface>,
    run: (event: LiveInteractionEvent<TEvent, TSurface>) => void
): void {
    if (event.surface) run({ ...event, surface: event.surface });
}

export function createInteractionAdapter<TSurface>(
    interactions: CanvasInteractions<TSurface> = {},
    handlers: {
        onStart?: ((e: LiveInteractionEvent<PointerEvent, TSurface>) => void) | undefined;
        onMove?: ((e: LiveInteractionEvent<PointerEvent, TSurface>) => void) | undefined;
        onEnd?: ((e: LiveInteractionEvent<PointerEvent, TSurface>) => void) | undefined;
        onZoom?: ((e: LiveInteractionEvent<WheelEvent, TSurface>) => void) | undefined;
        onContextMenu?: ((e: LiveInteractionEvent<MouseEvent, TSurface>) => void) | undefined;
    } = {}
): Gesture<TSurface>[] {
    const gestures: Gesture<TSurface>[] = [];
    const lifecycle: Gesture<TSurface> = {};

    const hStart = handlers.onStart ?? interactions.onStart;
    const hMove = handlers.onMove ?? interactions.onMove;
    const hZoom = handlers.onZoom ?? interactions.onZoom;
    const hEnd = handlers.onEnd ?? interactions.onEnd;
    const hContext = handlers.onContextMenu ?? interactions.onContextMenu;

    if (hStart)
        lifecycle.onStart = (event: InteractionEvent<PointerEvent, TSurface>) => {
            withSurface(event, (e) => {
                hStart(e);
            });
        };

    if (hMove)
        lifecycle.onMove = (event: InteractionEvent<PointerEvent, TSurface>) => {
            withSurface(event, (e) => {
                hMove(e);
            });
        };

    if (hZoom)
        lifecycle.onZoom = (event: InteractionEvent<WheelEvent, TSurface>) => {
            withSurface(event, (e) => {
                hZoom(e);
            });
        };

    if (hEnd)
        lifecycle.onEnd = (event: InteractionEvent<PointerEvent, TSurface>) => {
            withSurface(event, (e) => {
                hEnd(e);
            });
        };

    if (hContext)
        lifecycle.onContextMenu = (event: InteractionEvent<MouseEvent, TSurface>) => {
            withSurface(event, (e) => {
                hContext(e);
            });
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

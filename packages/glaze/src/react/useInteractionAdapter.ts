import { useEffectEvent } from 'react';
import { createInteractionAdapter } from './interactions';

import type { Gesture, InteractionEvent, PanOptions, ZoomOptions } from '../core/gestures';

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

export function useInteractionAdapter<TSurface>(
    interactions: CanvasInteractions<TSurface> = {}
): Gesture<TSurface>[] {
    const onStart = useEffectEvent((e: LiveInteractionEvent<PointerEvent, TSurface>) => {
        interactions.onStart?.(e);
    });

    const onMove = useEffectEvent((e: LiveInteractionEvent<PointerEvent, TSurface>) => {
        interactions.onMove?.(e);
    });

    const onEnd = useEffectEvent((e: LiveInteractionEvent<PointerEvent, TSurface>) => {
        interactions.onEnd?.(e);
    });

    const onZoom = useEffectEvent((e: LiveInteractionEvent<WheelEvent, TSurface>) => {
        interactions.onZoom?.(e);
    });

    const onContextMenu = useEffectEvent((e: LiveInteractionEvent<MouseEvent, TSurface>) => {
        interactions.onContextMenu?.(e);
    });

    return createInteractionAdapter(interactions, {
        onStart: interactions.onStart ? onStart : undefined,
        onMove: interactions.onMove ? onMove : undefined,
        onEnd: interactions.onEnd ? onEnd : undefined,
        onZoom: interactions.onZoom ? onZoom : undefined,
        onContextMenu: interactions.onContextMenu ? onContextMenu : undefined,
    });
}

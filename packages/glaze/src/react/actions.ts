import type { InputStore } from '../cpu/createInputStore';
import { DEFAULT_ZOOM_BOUNDS, type Camera, type Point2D, type ZoomBounds } from '../core/coords/camera';

export const DEFAULT_WHEEL_SPEED = 0.002;

export type PointerHandler<TSurface> = (
    event: PointerEvent,
    surface: TSurface
) => boolean | undefined;

export type WheelHandler<TSurface> = (event: WheelEvent, surface: TSurface) => boolean | undefined;

export type ContextMenuHandler<TSurface> = (event: MouseEvent, surface: TSurface) => void;

/**
 * Consumer actions. They run before the built-in pan/zoom actions: a handler
 * returning `true` consumes the event and overrides the default; returning
 * falsy chains through to the default action.
 */
export type PointerHandlers<TSurface> = {
    onPointerDown?: PointerHandler<TSurface>;
    onPointerMove?: PointerHandler<TSurface>;
    onPointerUp?: PointerHandler<TSurface>;
    onPointerCancel?: PointerHandler<TSurface>;
    onWheel?: WheelHandler<TSurface>;
    onContextMenu?: ContextMenuHandler<TSurface>;
};

export type RouterOptions<TSurface> = {
    pan?: boolean | undefined;
    zoom?: boolean | undefined;
    panButton?: number | number[] | undefined;
    zoomSpeed?: number | undefined;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    pointerHandlers?: PointerHandlers<TSurface> | undefined;
};

export type InputRouterOptions<TSurface> = RouterOptions<TSurface> & {
    input: InputStore;
    camera: Camera;
    getSurface(): TSurface | null;
};

function matchesPanButton(button: number, filter?: number | number[]): boolean {
    if (filter === undefined) return true;
    return Array.isArray(filter) ? filter.includes(button) : filter === button;
}

function runHandler<TSurface>(
    handler: PointerHandler<TSurface> | WheelHandler<TSurface> | undefined,
    event: PointerEvent | WheelEvent,
    surface: TSurface
): boolean {
    if (!handler) return false;
    return (
        (handler as (event: PointerEvent | WheelEvent, surface: TSurface) => boolean | undefined)(
            event,
            surface
        ) === true
    );
}

function boundsOf(options: { minZoom?: number | undefined; maxZoom?: number | undefined }): ZoomBounds {
    return {
        minZoom: options.minZoom ?? DEFAULT_ZOOM_BOUNDS.minZoom,
        maxZoom: options.maxZoom ?? DEFAULT_ZOOM_BOUNDS.maxZoom
    };
}

/**
 * Routes input to actions: consumer `pointerHandlers` first, then the built-in
 * pan (pointer drag) and zoom (wheel) defaults, both mutating the camera.
 */
export function createInputRouter<TSurface>(options: InputRouterOptions<TSurface>) {
    const dragging = { active: false };

    const onPointerDown = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface && runHandler(options.pointerHandlers?.onPointerDown, event, surface)) {
            return;
        }
        if (!options.pan) return;
        if (!matchesPanButton(event.button, options.panButton)) return;

        dragging.active = true;
        (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface && runHandler(options.pointerHandlers?.onPointerMove, event, surface)) {
            return;
        }
        if (!dragging.active) return;
        options.camera.panBy(options.input.pointerDelta.x, options.input.pointerDelta.y);
    };

    const onPointerUp = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface) runHandler(options.pointerHandlers?.onPointerUp, event, surface);
        dragging.active = false;
    };

    const onPointerCancel = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface) runHandler(options.pointerHandlers?.onPointerCancel, event, surface);
        dragging.active = false;
    };

    const onWheel = (event: WheelEvent, point: Point2D): void => {
        const surface = options.getSurface();
        if (surface && runHandler(options.pointerHandlers?.onWheel, event, surface)) {
            return;
        }
        if (!options.zoom) return;

        event.preventDefault();
        options.camera.zoomBy(
            Math.exp(-event.deltaY * (options.zoomSpeed ?? DEFAULT_WHEEL_SPEED)),
            point,
            boundsOf(options)
        );
    };

    const onContextMenu = (event: MouseEvent): void => {
        if (options.pan && matchesPanButton(2, options.panButton)) event.preventDefault();
        const surface = options.getSurface();
        if (surface) options.pointerHandlers?.onContextMenu?.(event, surface);
    };

    const dispose = options.input.subscribe({
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
        onWheel,
        onContextMenu
    });

    return { dispose };
}

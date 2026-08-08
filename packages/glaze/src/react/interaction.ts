import type { Point2D } from '../core/coords/camera';

export type PointerHandler<TSurface> = (
    event: PointerEvent,
    surface: TSurface
) => boolean | undefined;

export type WheelHandler<TSurface> = (event: WheelEvent, surface: TSurface) => boolean | undefined;

export type ContextMenuHandler<TSurface> = (event: MouseEvent, surface: TSurface) => void;

export type PointerHandlers<TSurface> = {
    onPointerDown?: PointerHandler<TSurface>;
    onPointerMove?: PointerHandler<TSurface>;
    onPointerUp?: PointerHandler<TSurface>;
    onPointerCancel?: PointerHandler<TSurface>;
    onWheel?: WheelHandler<TSurface>;
    onContextMenu?: ContextMenuHandler<TSurface>;
};

export type InteractionOptions<TSurface> = {
    pan?: boolean | undefined;
    zoom?: boolean | undefined;
    panButton?: number | number[] | undefined;
    pointerHandlers?: PointerHandlers<TSurface> | undefined;
};

function matchesPanButton(button: number, filter?: number | number[]): boolean {
    if (filter === undefined) return true;
    return Array.isArray(filter) ? filter.includes(button) : filter === button;
}

export type InteractionControllerOptions<TSurface> = {
    handlers: PointerHandlers<TSurface>;
    pan: boolean;
    zoom: boolean;
    panButton?: number | number[] | undefined;
    getSurface(): TSurface | null;
    onPan(dx: number, dy: number): void;
    onZoom(deltaY: number, focalPoint: Point2D): void;
};

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

export function createInteractionController<TSurface>(
    options: InteractionControllerOptions<TSurface>
) {
    const dragging = { active: false };

    const onPointerDown = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface && runHandler(options.handlers.onPointerDown, event, surface)) {
            return;
        }
        if (!options.pan) return;
        if (!matchesPanButton(event.button, options.panButton)) return;

        dragging.active = true;
        (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface && runHandler(options.handlers.onPointerMove, event, surface)) {
            return;
        }
        if (!dragging.active) return;
        options.onPan(event.movementX, event.movementY);
    };

    const onPointerUp = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface) runHandler(options.handlers.onPointerUp, event, surface);
        dragging.active = false;
    };

    const onPointerCancel = (event: PointerEvent): void => {
        const surface = options.getSurface();
        if (surface) runHandler(options.handlers.onPointerCancel, event, surface);
        dragging.active = false;
    };

    const onWheel = (event: WheelEvent): void => {
        const surface = options.getSurface();
        if (surface && runHandler(options.handlers.onWheel, event, surface)) {
            return;
        }
        if (!options.zoom) return;
        if (!(event.target instanceof HTMLElement)) return;

        event.preventDefault();
        const rect = event.target.getBoundingClientRect();
        options.onZoom(event.deltaY, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    const onContextMenu = (event: MouseEvent): void => {
        if (options.pan && matchesPanButton(2, options.panButton)) event.preventDefault();
        const surface = options.getSurface();
        if (surface) options.handlers.onContextMenu?.(event, surface);
    };

    return {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
        onWheel,
        onContextMenu
    };
}

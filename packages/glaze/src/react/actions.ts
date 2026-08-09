import type { InputStore } from '../cpu/createInputStore';
import type { CameraControls } from '../core/coords/cameraControls';
import type { Point2D } from '../core/coords/camera';

export const DEFAULT_WHEEL_SPEED = 0.002;

export type PointerHandler<TSurface> = (
    event: PointerEvent,
    surface: TSurface
) => boolean | undefined;

export type WheelHandler<TSurface> = (event: WheelEvent, surface: TSurface) => boolean | undefined;

export type ContextMenuHandler<TSurface> = (event: MouseEvent, surface: TSurface) => void;

/**
 * Consumer handlers, run as the first gesture in the pipeline. A handler
 * returning `true` consumes the event and stops the chain; returning falsy
 * lets the built-in gestures run.
 */
export type PointerHandlers<TSurface> = {
    onPointerDown?: PointerHandler<TSurface>;
    onPointerMove?: PointerHandler<TSurface>;
    onPointerUp?: PointerHandler<TSurface>;
    onPointerCancel?: PointerHandler<TSurface>;
    onWheel?: WheelHandler<TSurface>;
    onContextMenu?: ContextMenuHandler<TSurface>;
};

/**
 * What a gesture gets to work with: the raw input signals, the mutation
 * contract for the camera, and the current surface (when one is mounted).
 */
export type GestureContext<TSurface> = {
    input: InputStore;
    controls: CameraControls;
    surface: TSurface | null;
};

/**
 * A gesture interprets raw `InputStore` events and drives change — camera
 * mutation through `controls`, or drawing straight on `context.surface`.
 *
 * `onPointerDown` / `onPointerMove` / `onWheel` are chainable: returning
 * `true` consumes the event and stops the router from reaching the next
 * gesture. `onPointerUp` / `onPointerCancel` / `onContextMenu` are
 * broadcast: every gesture receives them (so captured state is always
 * released) and return values are ignored.
 */
export type Gesture<TSurface> = {
    onPointerDown?: (event: PointerEvent, point: Point2D, context: GestureContext<TSurface>) => boolean | undefined;
    onPointerMove?: (event: PointerEvent, point: Point2D, context: GestureContext<TSurface>) => boolean | undefined;
    onPointerUp?: (event: PointerEvent, point: Point2D, context: GestureContext<TSurface>) => void;
    onPointerCancel?: (event: PointerEvent, point: Point2D, context: GestureContext<TSurface>) => void;
    onWheel?: (event: WheelEvent, point: Point2D, context: GestureContext<TSurface>) => boolean | undefined;
    onContextMenu?: (event: MouseEvent, context: GestureContext<TSurface>) => void;
};

export type PanGestureOptions = {
    button?: number | number[] | undefined;
};

/**
 * Pointer-drag panning. Capture starts on a matching button press and the
 * camera pans with every pointer move while dragging.
 */
export function createPanGesture<TSurface>(options: PanGestureOptions = {}): Gesture<TSurface> {
    const { button } = options;
    let active = false;

    const onPointerDown = (event: PointerEvent): boolean | undefined => {
        if (!matchesButton(event.button, button)) return;
        active = true;
        (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
        return true;
    };

    const onPointerMove = (_event: PointerEvent, _point: Point2D, context: GestureContext<TSurface>): boolean | undefined => {
        if (!active) return;
        context.controls.panBy(context.input.pointerDelta.x, context.input.pointerDelta.y);
        return true;
    };

    const onPointerUp = (): void => {
        active = false;
    };

    const onPointerCancel = (): void => {
        active = false;
    };

    const onContextMenu = (event: MouseEvent): void => {
        if (matchesButton(2, button)) event.preventDefault();
    };

    return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onContextMenu };
}

export type ZoomGestureOptions = {
    speed?: number | undefined;
};

/**
 * Wheel zooming. Scales around the cursor position; the zoom value is
 * clamped by `controls`.
 */
export function createZoomGesture<TSurface>(options: ZoomGestureOptions = {}): Gesture<TSurface> {
    const speed = options.speed ?? DEFAULT_WHEEL_SPEED;

    const onWheel = (event: WheelEvent, point: Point2D, context: GestureContext<TSurface>): boolean => {
        event.preventDefault();
        context.controls.zoomBy(Math.exp(-event.deltaY * speed), point);
        return true;
    };

    return { onWheel };
}

/**
 * Adapts the consumer `pointerHandlers` callback bundle into a gesture so it
 * sits first in the pipeline. Handlers only fire while a surface is mounted.
 */
export function createPointerHandlersGesture<TSurface>(
    handlers: PointerHandlers<TSurface>
): Gesture<TSurface> {
    return {
        onPointerDown(event, _point, context) {
            const surface = context.surface;
            if (!surface) return false;
            return runHandler(handlers.onPointerDown, event, surface);
        },
        onPointerMove(event, _point, context) {
            const surface = context.surface;
            if (!surface) return false;
            return runHandler(handlers.onPointerMove, event, surface);
        },
        onPointerUp(event, _point, context) {
            const surface = context.surface;
            if (surface) runHandler(handlers.onPointerUp, event, surface);
        },
        onPointerCancel(event, _point, context) {
            const surface = context.surface;
            if (surface) runHandler(handlers.onPointerCancel, event, surface);
        },
        onWheel(event, _point, context) {
            const surface = context.surface;
            if (!surface) return false;
            return runHandler(handlers.onWheel, event, surface);
        },
        onContextMenu(event, context) {
            const surface = context.surface;
            if (surface) handlers.onContextMenu?.(event, surface);
        }
    };
}

export type RouterOptions<TSurface> = {
    pan?: boolean | undefined;
    zoom?: boolean | undefined;
    panButton?: number | number[] | undefined;
    zoomSpeed?: number | undefined;
    pointerHandlers?: PointerHandlers<TSurface> | undefined;
    gestures?: Gesture<TSurface>[] | undefined;
};

export type InputRouterOptions<TSurface> = {
    input: InputStore;
    controls: CameraControls;
    getSurface(): TSurface | null;
    gestures: Gesture<TSurface>[];
};

function matchesButton(button: number, filter?: number | number[]): boolean {
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

/**
 * Routes raw `InputStore` events through an ordered list of gestures. The
 * first gesture to return `true` from a chainable handler consumes the
 * event; terminal events reach every gesture.
 */
export function createInputRouter<TSurface>(options: InputRouterOptions<TSurface>) {
    const { input } = options;

    const context: GestureContext<TSurface> = {
        get input() {
            return options.input;
        },
        get controls() {
            return options.controls;
        },
        get surface() {
            return options.getSurface();
        }
    };

    const onPointerDown = (event: PointerEvent, point: Point2D): void => {
        for (const gesture of options.gestures) {
            if (gesture.onPointerDown?.(event, point, context)) break;
        }
    };

    const onPointerMove = (event: PointerEvent, point: Point2D): void => {
        for (const gesture of options.gestures) {
            if (gesture.onPointerMove?.(event, point, context)) break;
        }
    };

    const onWheel = (event: WheelEvent, point: Point2D): void => {
        for (const gesture of options.gestures) {
            if (gesture.onWheel?.(event, point, context)) break;
        }
    };

    const onPointerUp = (event: PointerEvent, point: Point2D): void => {
        for (const gesture of options.gestures) gesture.onPointerUp?.(event, point, context);
    };

    const onPointerCancel = (event: PointerEvent, point: Point2D): void => {
        for (const gesture of options.gestures) gesture.onPointerCancel?.(event, point, context);
    };

    const onContextMenu = (event: MouseEvent): void => {
        for (const gesture of options.gestures) gesture.onContextMenu?.(event, context);
    };

    const dispose = input.subscribe({
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
        onWheel,
        onContextMenu
    });

    return { dispose };
}

import type { Camera, Point2D } from '../core/coords/camera';
import type { InputStore } from '../cpu/input';

export type FrameSnapshot = {
    readonly time: number;
    readonly deltaTime: number;
    readonly frameCount: number;
    readonly dpr: number;
};

export type InteractionContext = {
    readonly camera: Camera;
    readonly input: InputStore | null;
    readonly width: number;
    readonly height: number;
    readonly dpr: number;
    readonly time: number;
    readonly deltaTime: number;
    readonly frameCount: number;
    readonly consumed: boolean;
    consume(): void;
};

export type InteractionContextBase = Omit<InteractionContext, 'consumed' | 'consume'>;

export type PointerHandler = (event: PointerEvent, ctx: InteractionContext) => boolean | undefined;

export type WheelHandler = (event: WheelEvent, ctx: InteractionContext) => boolean | undefined;

export type ContextMenuHandler = (event: MouseEvent, ctx: InteractionContext) => void;

export type PointerHandlers = {
    onPointerDown?: PointerHandler;
    onPointerMove?: PointerHandler;
    onPointerUp?: PointerHandler;
    onPointerCancel?: PointerHandler;
    onWheel?: WheelHandler;
    onContextMenu?: ContextMenuHandler;
};

export type InteractionOptions = {
    pan?: boolean | undefined;
    zoom?: boolean | undefined;
    panButton?: number | number[] | undefined;
    pointerHandlers?: PointerHandlers | undefined;
};

export function matchesPanButton(button: number, filter?: number | number[]): boolean {
    if (filter === undefined) return true;
    return Array.isArray(filter) ? filter.includes(button) : filter === button;
}

export type InteractionControllerOptions = {
    handlers: PointerHandlers;
    pan: boolean;
    zoom: boolean;
    panButton?: number | number[] | undefined;
    getContext(): InteractionContextBase;
    onPan(dx: number, dy: number): void;
    onZoom(deltaY: number, focalPoint: Point2D): void;
};

function buildContext(base: InteractionContextBase): InteractionContext {
    let consumed = false;
    return {
        ...base,
        get consumed() {
            return consumed;
        },
        consume() {
            consumed = true;
        }
    };
}

function runHandler(
    handler: PointerHandler | WheelHandler | undefined,
    event: PointerEvent | WheelEvent,
    base: InteractionContextBase
): boolean {
    if (!handler) return false;
    const ctx = buildContext(base);
    const result = (
        handler as (
            event: PointerEvent | WheelEvent,
            ctx: InteractionContext
        ) => boolean | undefined
    )(event, ctx);
    return result === true || ctx.consumed;
}

export function createInteractionController(options: InteractionControllerOptions) {
    const dragging = { active: false };

    const onPointerDown = (event: PointerEvent): void => {
        if (runHandler(options.handlers.onPointerDown, event, options.getContext())) {
            return;
        }
        if (!options.pan) return;
        if (!matchesPanButton(event.button, options.panButton)) return;

        dragging.active = true;
        (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent): void => {
        if (runHandler(options.handlers.onPointerMove, event, options.getContext())) {
            return;
        }
        if (!dragging.active) return;
        options.onPan(event.movementX, event.movementY);
    };

    const onPointerUp = (event: PointerEvent): void => {
        runHandler(options.handlers.onPointerUp, event, options.getContext());
        dragging.active = false;
    };

    const onPointerCancel = (event: PointerEvent): void => {
        runHandler(options.handlers.onPointerCancel, event, options.getContext());
        dragging.active = false;
    };

    const onWheel = (event: WheelEvent): void => {
        if (runHandler(options.handlers.onWheel, event, options.getContext())) {
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
        options.handlers.onContextMenu?.(event, buildContext(options.getContext()));
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

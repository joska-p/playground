import type { InputStore } from '../cpu/createInputStore';
import type { CameraControls } from '../core/coords/cameraControls';
import type { Point2D } from '../core/coords/camera';

export const DEFAULT_WHEEL_SPEED = 0.002;

/**
 * The unified context every interaction handler receives: the raw native
 * event, its screen-space point, the live input store, the camera controls,
 * and the targeted surface (when one is mounted). Built-in pan/zoom gestures
 * and custom `CanvasInteractions` handlers all read the same block.
 */
export type InteractionEvent<TEvent, TSurface> = {
    nativeEvent: TEvent;
    point: Point2D;
    input: InputStore;
    controls: CameraControls;
    surface: TSurface | null;
};

/**
 * An interaction event for a mounted surface. The pipeline only routes events
 * while a surface is mounted, so consumer handlers receive this — `surface`
 * is always present and needs no defensive check.
 */
export type LiveInteractionEvent<TEvent, TSurface> = Omit<
    InteractionEvent<TEvent, TSurface>,
    'surface'
> & {
    surface: TSurface;
};

export type PanOptions = {
    button?: number | number[];
};

export type ZoomOptions = {
    speed?: number;
};

/**
 * The consumer-facing interaction lifecycle. Physical events map onto
 * readable action cycles: `pointerdown` -> `onStart`, `pointermove` ->
 * `onMove`, `pointerup` / `pointercancel` -> `onEnd`, `wheel` -> `onZoom`.
 *
 * `onStart`, `onMove` and `onZoom` are chainable: returning `true` consumes
 * the event and stops the built-in gestures from running; returning falsy
 * lets them proceed. `onEnd` and `onContextMenu` are broadcast — every
 * gesture receives them (so captured state is always released) and return
 * values are ignored.
 *
 * Handlers only fire while a surface is mounted, so they receive a
 * `LiveInteractionEvent` whose `surface` is always present. `pan` and `zoom`
 * configure the built-in gestures; `false` turns one off, an options object
 * configures it, and omitting it keeps the default behavior.
 */
export type CanvasInteractions<TSurface> = {
    pan?: boolean | PanOptions;
    zoom?: boolean | ZoomOptions;
    onStart?: (event: LiveInteractionEvent<PointerEvent, TSurface>) => boolean;
    onMove?: (event: LiveInteractionEvent<PointerEvent, TSurface>) => boolean;
    onEnd?: (event: LiveInteractionEvent<PointerEvent, TSurface>) => void;
    onZoom?: (event: LiveInteractionEvent<WheelEvent, TSurface>) => boolean;
    onContextMenu?: (event: LiveInteractionEvent<MouseEvent, TSurface>) => void;
};

/**
 * A pipeline step that interprets `InteractionEvent`s and drives change —
 * camera mutation through `controls`, or drawing straight on `event.surface`.
 * `PanGesture` / `ZoomGesture` are the built-in steps; consumer
 * `CanvasInteractions` are adapted into steps by `createInteractionAdapter`.
 */
export type Gesture<TSurface> = {
    onStart?: (event: InteractionEvent<PointerEvent, TSurface>) => boolean;
    onMove?: (event: InteractionEvent<PointerEvent, TSurface>) => boolean;
    onEnd?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onZoom?: (event: InteractionEvent<WheelEvent, TSurface>) => boolean;
    onContextMenu?: (event: InteractionEvent<MouseEvent, TSurface>) => void;
};

/**
 * Pointer-drag panning. Capture starts on a matching button press and the
 * camera pans with every pointer move while dragging.
 */
export class PanGesture<TSurface> {
    /** True while a drag is being captured; `onMove` only pans while active. */
    active = false;
    readonly #button: number | number[] | undefined;

    constructor(options: PanOptions = {}) {
        this.#button = options.button;
    }

    onStart = (event: InteractionEvent<PointerEvent, TSurface>): boolean => {
        if (!matchesButton(event.nativeEvent.button, this.#button)) return false;
        this.active = true;
        (event.nativeEvent.currentTarget as HTMLElement | null)?.setPointerCapture(
            event.nativeEvent.pointerId
        );
        return true;
    };

    onMove = (event: InteractionEvent<PointerEvent, TSurface>): boolean => {
        if (!this.active) return false;
        event.controls.panBy(event.input.pointerDelta.x, event.input.pointerDelta.y);
        return true;
    };

    onEnd = (): void => {
        this.active = false;
    };

    onContextMenu = (event: InteractionEvent<MouseEvent, TSurface>): void => {
        if (matchesButton(2, this.#button)) event.nativeEvent.preventDefault();
    };
}

export function createPanGesture<TSurface>(options: PanOptions = {}): PanGesture<TSurface> {
    return new PanGesture<TSurface>(options);
}

/**
 * Wheel zooming. Scales around the cursor position; the zoom value is
 * clamped by `controls`.
 */
export class ZoomGesture<TSurface> {
    readonly #speed: number;

    constructor(options: ZoomOptions = {}) {
        this.#speed = options.speed ?? DEFAULT_WHEEL_SPEED;
    }

    onZoom = (event: InteractionEvent<WheelEvent, TSurface>): boolean => {
        event.nativeEvent.preventDefault();
        event.controls.zoomBy(Math.exp(-event.nativeEvent.deltaY * this.#speed), event.point);
        return true;
    };
}

export function createZoomGesture<TSurface>(options: ZoomOptions = {}): ZoomGesture<TSurface> {
    return new ZoomGesture<TSurface>(options);
}

/**
 * Adapts the consumer `CanvasInteractions` config into the pipeline. The
 * lifecycle handlers slot first (so they run before the built-in gestures)
 * and only fire while a surface is mounted; `pan` / `zoom` then append their
 * built-in gestures, defaulting to on.
 */
export function createInteractionAdapter<TSurface>(
    interactions: CanvasInteractions<TSurface> = {}
): Gesture<TSurface>[] {
    const gestures: Gesture<TSurface>[] = [];

    const lifecycle: Gesture<TSurface> = {};
    if (interactions.onStart)
        lifecycle.onStart = (event: InteractionEvent<PointerEvent, TSurface>) =>
            withSurface(event, (e) => interactions.onStart?.(e) ?? false);
    if (interactions.onMove)
        lifecycle.onMove = (event: InteractionEvent<PointerEvent, TSurface>) =>
            withSurface(event, (e) => interactions.onMove?.(e) ?? false);
    if (interactions.onZoom)
        lifecycle.onZoom = (event: InteractionEvent<WheelEvent, TSurface>) =>
            withSurface(event, (e) => interactions.onZoom?.(e) ?? false);
    if (interactions.onEnd)
        lifecycle.onEnd = (event: InteractionEvent<PointerEvent, TSurface>) => {
            if (event.surface) interactions.onEnd?.({ ...event, surface: event.surface });
        };
    if (interactions.onContextMenu)
        lifecycle.onContextMenu = (event: InteractionEvent<MouseEvent, TSurface>) => {
            if (event.surface) interactions.onContextMenu?.({ ...event, surface: event.surface });
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

    if (interactions.pan !== false)
        gestures.push(new PanGesture(typeof interactions.pan === 'object' ? interactions.pan : {}));
    if (interactions.zoom !== false)
        gestures.push(
            new ZoomGesture(typeof interactions.zoom === 'object' ? interactions.zoom : {})
        );

    return gestures;
}

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

function withSurface<TEvent, TSurface>(
    event: InteractionEvent<TEvent, TSurface>,
    run: (event: LiveInteractionEvent<TEvent, TSurface>) => boolean
): boolean {
    if (!event.surface) return false;
    return run({ ...event, surface: event.surface });
}

/**
 * Routes raw `InputStore` events through an ordered list of gestures,
 * wrapping each event's native signal into an `InteractionEvent`. The first
 * gesture to return `true` from a chainable handler consumes the event;
 * terminal events reach every gesture. Reads `controls`, `getSurface`, and
 * `gestures` from its options at event time, so those can be swapped without
 * re-subscribing.
 */
export class InputRouter<TSurface> {
    readonly #options: InputRouterOptions<TSurface>;
    readonly #dispose: () => void;

    constructor(options: InputRouterOptions<TSurface>) {
        this.#options = options;
        this.#dispose = options.input.subscribe({
            onPointerDown: this.#onStart,
            onPointerMove: this.#onMove,
            onPointerUp: this.#onEnd,
            onPointerCancel: this.#onEnd,
            onWheel: this.#onZoom,
            onContextMenu: this.#onContextMenu
        });
    }

    dispose(): void {
        this.#dispose();
    }

    #interaction = <TEvent>(
        nativeEvent: TEvent,
        point: Point2D
    ): InteractionEvent<TEvent, TSurface> => {
        const options = this.#options;
        return {
            nativeEvent,
            point,
            input: options.input,
            get controls() {
                return options.controls;
            },
            get surface() {
                return options.getSurface();
            }
        };
    };

    #onStart = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) {
            if (gesture.onStart?.(event)) break;
        }
    };

    #onMove = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) {
            if (gesture.onMove?.(event)) break;
        }
    };

    #onZoom = (nativeEvent: WheelEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) {
            if (gesture.onZoom?.(event)) break;
        }
    };

    #onEnd = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) gesture.onEnd?.(event);
    };

    #onContextMenu = (nativeEvent: MouseEvent): void => {
        const event = this.#interaction(nativeEvent, this.#options.input.pointer);
        for (const gesture of this.#options.gestures) gesture.onContextMenu?.(event);
    };
}

export function createInputRouter<TSurface>(
    options: InputRouterOptions<TSurface>
): InputRouter<TSurface> {
    return new InputRouter(options);
}

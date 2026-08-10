import type { InputStore } from './InputStore';
import type { CameraControls } from './CameraControls';
import type { Point2D } from './Camera';

export const DEFAULT_WHEEL_SPEED = 0.002;

export interface PanOptions {
    button?: number | number[];
}

export interface ZoomOptions {
    speed?: number;
}

/**
 * The unified context every gesture receives: the raw native event, its
 * screen-space point, the live input store, the camera controls, and the
 * targeted surface (when one is mounted). Built-in pan/zoom gestures and the
 * React facade's consumer handlers all read the same block.
 */
export interface InteractionEvent<TEvent, TSurface> {
    nativeEvent: TEvent;
    point: Point2D;
    input: InputStore;
    cameraControls: CameraControls;
    surface: TSurface | null;
}

/**
 * A pipeline step that interprets `InteractionEvent`s and drives change —
 * camera mutation through `cameraControls`, or drawing straight on
 * `event.surface`. `PanGesture` / `ZoomGesture` are the built-in steps; the
 * React facade adapts its consumer `CanvasInteractions` into steps too.
 *
 * Every gesture receives every event; a gesture either handles it or ignores
 * it. Custom handlers replace the built-ins rather than chain against them,
 * so there is no consume protocol.
 */
export interface Gesture<TSurface> {
    onStart?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onMove?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onEnd?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onZoom?: (event: InteractionEvent<WheelEvent, TSurface>) => void;
    onContextMenu?: (event: InteractionEvent<MouseEvent, TSurface>) => void;
}

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

    onStart = (event: InteractionEvent<PointerEvent, TSurface>): void => {
        if (!matchesButton(event.nativeEvent.button, this.#button)) return;
        this.active = true;
        (event.nativeEvent.currentTarget as HTMLElement | null)?.setPointerCapture(
            event.nativeEvent.pointerId
        );
    };

    onMove = (event: InteractionEvent<PointerEvent, TSurface>): void => {
        if (!this.active) return;
        event.cameraControls.panBy(event.input.pointerDelta.x, event.input.pointerDelta.y);
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
 * clamped by `cameraControls`.
 */
export class ZoomGesture<TSurface> {
    readonly #speed: number;

    constructor(options: ZoomOptions = {}) {
        this.#speed = options.speed ?? DEFAULT_WHEEL_SPEED;
    }

    onZoom = (event: InteractionEvent<WheelEvent, TSurface>): void => {
        event.nativeEvent.preventDefault();
        event.cameraControls.zoomBy(Math.exp(-event.nativeEvent.deltaY * this.#speed), event.point);
    };
}

export function createZoomGesture<TSurface>(options: ZoomOptions = {}): ZoomGesture<TSurface> {
    return new ZoomGesture<TSurface>(options);
}

export interface InputRouterOptions<TSurface> {
    input: InputStore;
    cameraControls: CameraControls;
    getSurface(): TSurface | null;
    gestures: Gesture<TSurface>[];
}

function matchesButton(button: number, filter?: number | number[]): boolean {
    if (filter === undefined) return true;
    return Array.isArray(filter) ? filter.includes(button) : filter === button;
}

/**
 * Routes raw `InputStore` events through an ordered list of gestures,
 * wrapping each event's native signal into an `InteractionEvent`. Every
 * gesture receives every event. Reads `cameraControls`, `getSurface`, and
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
            get cameraControls() {
                return options.cameraControls;
            },
            get surface() {
                return options.getSurface();
            }
        };
    };

    #onStart = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) gesture.onStart?.(event);
    };

    #onMove = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) gesture.onMove?.(event);
    };

    #onZoom = (nativeEvent: WheelEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);
        for (const gesture of this.#options.gestures) gesture.onZoom?.(event);
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

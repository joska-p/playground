import type { Point2D } from './Camera';
import type { CameraControls } from './CameraControls';
import type { InputStore } from './InputStore';

export const DEFAULT_WHEEL_SPEED = 0.002;

export interface PanOptions {
    button?: number | number[];
}

export interface ZoomOptions {
    speed?: number;
}

export interface InteractionEvent<TEvent, TSurface> {
    nativeEvent: TEvent;
    point: Point2D;
    input: InputStore;
    cameraControls: CameraControls;
    surface: TSurface | null;
}

/**
 * Every gesture receives every event and decides to handle or ignore it. Custom gestures replace
 * the built-ins — there is no consume protocol.
 */
export interface Gesture<TSurface> {
    onStart?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onMove?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onEnd?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onZoom?: (event: InteractionEvent<WheelEvent, TSurface>) => void;
    onContextMenu?: (event: InteractionEvent<MouseEvent, TSurface>) => void;
}

export class PanGesture<TSurface> {
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

/** Wheel zoom around the cursor; the value is clamped by `cameraControls`. */
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
    getGestures(): Gesture<TSurface>[];
}

function matchesButton(button: number, filter?: number | number[]): boolean {
    if (filter === undefined) return true;

    return Array.isArray(filter) ? filter.includes(button) : filter === button;
}

/**
 * Reads `cameraControls`, `getSurface`, and `getGestures()` from its options at event time, so they
 * can be swapped without re-subscribing.
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

        for (const gesture of this.#options.getGestures()) gesture.onStart?.(event);
    };

    #onMove = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);

        for (const gesture of this.#options.getGestures()) gesture.onMove?.(event);
    };

    #onZoom = (nativeEvent: WheelEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);

        for (const gesture of this.#options.getGestures()) gesture.onZoom?.(event);
    };

    #onEnd = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);

        for (const gesture of this.#options.getGestures()) gesture.onEnd?.(event);
    };

    #onContextMenu = (nativeEvent: MouseEvent): void => {
        const event = this.#interaction(nativeEvent, this.#options.input.pointer);

        for (const gesture of this.#options.getGestures()) gesture.onContextMenu?.(event);
    };
}

export function createInputRouter<TSurface>(
    options: InputRouterOptions<TSurface>
): InputRouter<TSurface> {
    return new InputRouter(options);
}

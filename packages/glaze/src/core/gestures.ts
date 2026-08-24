import { toScreenPoint, type Point2D, type ScreenPoint } from './Camera';
import { createWheelSpeed, type WheelSpeed } from './types';
import type { CameraControls } from './CameraControls';
import type { InputStore } from './InputStore';

/** Per-wheel-pixel exponential zoom rate, validated once at import. */
export const DEFAULT_WHEEL_SPEED: WheelSpeed = createWheelSpeed(0.002);

export interface PanOptions {
    button?: number | number[];
}

export interface ZoomOptions {
    /** Raw at the boundary; validated to be strictly positive and finite at construction. */
    speed?: number;
}

export interface InteractionEvent<TEvent, TSurface> {
    nativeEvent: TEvent;
    point: ScreenPoint;
    input: InputStore;
    cameraControls: CameraControls;
    surface: TSurface | null;
}

/**
 * Every gesture receives every event and decides to handle or ignore it — there is no consume
 * protocol. Returning `true` from `onStart` claims the interaction, and the router captures the
 * pointer; `onCancel` lets the router release transient state when disposed mid-interaction.
 */
export interface Gesture<TSurface> {
    /** Return exactly `true` to claim the interaction; pointer capture is router policy. */
    onStart?: (event: InteractionEvent<PointerEvent, TSurface>) => unknown;
    onMove?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onEnd?: (event: InteractionEvent<PointerEvent, TSurface>) => void;
    onZoom?: (event: InteractionEvent<WheelEvent, TSurface>) => void;
    onContextMenu?: (event: InteractionEvent<MouseEvent, TSurface>) => void;
    /** Release transient state; called by the router on dispose, mid-drag included. */
    onCancel?: () => void;
}

/** Pans on button drag; pure decision logic — activation is reported, capture happens upstream. */
export class PanGesture<TSurface> {
    active = false;
    readonly #button: number | number[] | undefined;

    constructor(options: PanOptions = {}) {
        this.#button = options.button;
    }

    onStart = (event: InteractionEvent<PointerEvent, TSurface>): boolean => {
        if (!matchesButton(event.nativeEvent.button, this.#button)) return false;

        this.active = true;

        return true;
    };

    onMove = (event: InteractionEvent<PointerEvent, TSurface>): void => {
        if (!this.active) return;

        event.cameraControls.panBy(event.input.pointerDelta.x, event.input.pointerDelta.y);
    };

    onEnd = (): void => {
        this.active = false;
    };

    /** Dispose-safe twin of `onEnd`: releasing twice is harmless. */
    onCancel = (): void => {
        this.active = false;
    };

    onContextMenu = (event: InteractionEvent<MouseEvent, TSurface>): void => {
        if (matchesButton(2, this.#button)) event.nativeEvent.preventDefault();
    };
}

export function createPanGesture<TSurface>(options: PanOptions = {}): PanGesture<TSurface> {
    return new PanGesture<TSurface>(options);
}

/** Wheel zoom around the cursor; the resulting zoom is clamped by `cameraControls`. */
export class ZoomGesture<TSurface> {
    readonly #speed: WheelSpeed;

    constructor(options: ZoomOptions = {}) {
        this.#speed = createWheelSpeed(options.speed ?? DEFAULT_WHEEL_SPEED);
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

/** The acting edge of the capture policy: a claimed `pointerdown` pins events to the canvas. */
function capturePointer(event: PointerEvent): void {
    (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
}

/**
 * Reads `cameraControls`, `getSurface`, and `getGestures()` from its options at event time, so they
 * can be swapped without re-subscribing.
 */
export class InputRouter<TSurface> {
    readonly #options: InputRouterOptions<TSurface>;
    #unsubscribe: (() => void) | undefined;

    constructor(options: InputRouterOptions<TSurface>) {
        this.#options = options;
        this.#unsubscribe = options.input.subscribe({
            onPointerDown: this.#onStart,
            onPointerMove: this.#onMove,
            onPointerUp: this.#onEnd,
            onPointerCancel: this.#onEnd,
            onWheel: this.#onZoom,
            onContextMenu: this.#onContextMenu
        });
    }

    /** Stops routing first, then cancels gestures — unmount during a drag leaves no residue. */
    dispose(): void {
        const unsubscribe = this.#unsubscribe;

        if (unsubscribe === undefined) return;

        this.#unsubscribe = undefined;
        unsubscribe();

        for (const gesture of this.#options.getGestures()) gesture.onCancel?.();
    }

    #interaction = <TEvent>(
        nativeEvent: TEvent,
        point: Point2D
    ): InteractionEvent<TEvent, TSurface> => {
        const options = this.#options;

        return {
            nativeEvent,
            point: toScreenPoint(point),
            input: options.input,
            get cameraControls() {
                return options.cameraControls;
            },
            get surface() {
                return options.getSurface();
            }
        };
    };

    /**
     * Fans one hook out across every gesture and reports whether any claimed the interaction.
     * All gestures always receive the event — a claim never short-circuits the pass.
     */
    #dispatch = (invoke: (gesture: Gesture<TSurface>) => unknown): boolean => {
        let claimed = false;

        for (const gesture of this.#options.getGestures()) {
            if (invoke(gesture) === true) claimed = true;
        }

        return claimed;
    };

    #onStart = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);

        if (this.#dispatch((gesture) => gesture.onStart?.(event))) capturePointer(nativeEvent);
    };

    #onMove = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);

        this.#dispatch((gesture) => gesture.onMove?.(event));
    };

    #onZoom = (nativeEvent: WheelEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);

        this.#dispatch((gesture) => gesture.onZoom?.(event));
    };

    #onEnd = (nativeEvent: PointerEvent, point: Point2D): void => {
        const event = this.#interaction(nativeEvent, point);

        this.#dispatch((gesture) => gesture.onEnd?.(event));
    };

    #onContextMenu = (nativeEvent: MouseEvent): void => {
        const event = this.#interaction(nativeEvent, this.#options.input.pointer);

        this.#dispatch((gesture) => gesture.onContextMenu?.(event));
    };
}

export function createInputRouter<TSurface>(
    options: InputRouterOptions<TSurface>
): InputRouter<TSurface> {
    return new InputRouter(options);
}

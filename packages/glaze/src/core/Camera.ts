import {
    assertFinite,
    assertStrictlyPositive,
    createZoomFactor,
    type Brand,
    type ZoomFactor
} from './types';

export interface Point2D {
    x: number;
    y: number;
}

export type ScreenPoint = Brand<Point2D, 'ScreenPoint'>;
export type WorldPoint = Brand<Point2D, 'WorldPoint'>;
export type ScreenDelta = Brand<Point2D, 'ScreenDelta'>;
export type WorldDelta = Brand<Point2D, 'WorldDelta'>;

export interface ZoomBounds {
    minZoom: number;
    maxZoom: number;
}

function assertFinitePoint(point: Point2D, label: string): void {
    assertFinite(point.x, `${label} x`);
    assertFinite(point.y, `${label} y`);
}

export function toScreenPoint(point: Point2D): ScreenPoint {
    assertFinitePoint(point, 'screen point');

    return point as ScreenPoint;
}

export function toWorldPoint(point: Point2D): WorldPoint {
    assertFinitePoint(point, 'world point');

    return point as WorldPoint;
}

export function toScreenDelta(delta: Point2D): ScreenDelta {
    assertFinitePoint(delta, 'screen delta');

    return delta as ScreenDelta;
}

export function toWorldDelta(delta: Point2D): WorldDelta {
    assertFinitePoint(delta, 'world delta');

    return delta as WorldDelta;
}

export function createZoomBounds(minZoom: number, maxZoom: number): ZoomBounds {
    assertStrictlyPositive(minZoom, 'min zoom');
    assertStrictlyPositive(maxZoom, 'max zoom');

    if (minZoom >= maxZoom) {
        throw new Error(
            `Glaze: min zoom (${String(minZoom)}) must be strictly below max zoom (${String(maxZoom)})`
        );
    }

    return { minZoom, maxZoom };
}

export const DEFAULT_ZOOM_BOUNDS: ZoomBounds = createZoomBounds(0.05, 64);

/** Validated zoom policy — every value comes back finite, in bounds, and branded. */
export type ZoomClamp = (value: number) => ZoomFactor;

export function createZoomClamp(minZoom: number, maxZoom: number): ZoomClamp {
    const bounds = createZoomBounds(minZoom, maxZoom);

    return (value: number): ZoomFactor => {
        assertFinite(value, 'zoom');

        return createZoomFactor(Math.max(bounds.minZoom, Math.min(bounds.maxZoom, value)));
    };
}

/** Passive state — it never mutates itself; panning and zooming live in `CameraControls`. */
export class Camera {
    x: number;
    y: number;
    zoom: ZoomFactor;

    constructor(x: number, y: number, zoom: ZoomFactor) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
    }

    screenToWorld(screen: ScreenPoint): WorldPoint {
        return {
            x: (screen.x - this.x) / this.zoom,
            y: (screen.y - this.y) / this.zoom
        } as WorldPoint;
    }

    worldToScreen(world: WorldPoint): ScreenPoint {
        return {
            x: world.x * this.zoom + this.x,
            y: world.y * this.zoom + this.y
        } as ScreenPoint;
    }
}

export function createCamera(x: number, y: number, zoom: ZoomFactor): Camera {
    assertFinite(x, 'camera x');
    assertFinite(y, 'camera y');

    return new Camera(x, y, zoom);
}

export const defaultCamera = (): Camera => createCamera(0, 0, createZoomFactor(1));

/** Fresh camera with identical state — the snapshot primitive behind `reset()` semantics. */
export function copyCamera(camera: Camera): Camera {
    return createCamera(camera.x, camera.y, camera.zoom);
}

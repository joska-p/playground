export interface Point2D {
    x: number;
    y: number;
}

export interface ZoomBounds {
    minZoom: number;
    maxZoom: number;
}

export const DEFAULT_ZOOM_BOUNDS: ZoomBounds = { minZoom: 0.05, maxZoom: 64 };

export const clamp =
    (min: number, max: number) =>
    (value: number): number =>
        Math.max(min, Math.min(max, value));

/**
 * Passive spatial state: a pure coordinate grid plus its two conversion functions. It never mutates
 * itself — panning and zooming are gestures and live in `CameraControls`.
 */
export class Camera {
    x: number;
    y: number;
    zoom: number;

    constructor(x = 0, y = 0, zoom = 1) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
    }

    screenToWorld(screen: Point2D): Point2D {
        return {
            x: (screen.x - this.x) / this.zoom,
            y: (screen.y - this.y) / this.zoom
        };
    }

    worldToScreen(world: Point2D): Point2D {
        return {
            x: world.x * this.zoom + this.x,
            y: world.y * this.zoom + this.y
        };
    }
}

export const defaultCamera = (): Camera => new Camera();

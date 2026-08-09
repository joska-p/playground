export type Point2D = {
    x: number;
    y: number;
};

export type ZoomBounds = {
    minZoom: number;
    maxZoom: number;
};

export const DEFAULT_ZOOM_BOUNDS: ZoomBounds = { minZoom: 0.05, maxZoom: 64 };

export const clamp =
    (min: number, max: number) =>
    (value: number): number =>
        Math.max(min, Math.min(max, value));

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

    zoomAt(focalPoint: Point2D, nextZoom: number, bounds: ZoomBounds): void {
        const zoom = clamp(bounds.minZoom, bounds.maxZoom)(nextZoom);
        const world = this.screenToWorld(focalPoint);
        this.x = focalPoint.x - world.x * zoom;
        this.y = focalPoint.y - world.y * zoom;
        this.zoom = zoom;
    }

    panBy(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    zoomBy(factor: number, focalPoint: Point2D, bounds: ZoomBounds = DEFAULT_ZOOM_BOUNDS): void {
        this.zoomAt(focalPoint, this.zoom * factor, bounds);
    }
}

export const defaultCamera = (): Camera => new Camera();

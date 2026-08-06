export type Point2D = {
        x: number;
        y: number;
};

export type Camera = { x: number; y: number; zoom: number };

export const defaultCamera = (): Camera => ({ x: 0, y: 0, zoom: 1 });

export const screenToWorld =
        (camera: Camera) =>
        (screen: Point2D): Point2D => ({
                x: (screen.x - camera.x) / camera.zoom,
                y: (screen.y - camera.y) / camera.zoom
        });

export const worldToScreen =
        (camera: Camera) =>
        (world: Point2D): Point2D => ({
                x: world.x * camera.zoom + camera.x,
                y: world.y * camera.zoom + camera.y
        });

export type ZoomBounds = {
        minZoom: number;
        maxZoom: number;
};

export const clamp =
        (min: number, max: number) =>
        (value: number): number =>
                Math.max(min, Math.min(max, value));

export const zoomAt =
        (camera: Camera, bounds: ZoomBounds) =>
        (focalPoint: Point2D, nextZoom: number): void => {
                const zoom = clamp(bounds.minZoom, bounds.maxZoom)(nextZoom);
                const world = screenToWorld(camera)(focalPoint);
                camera.x = focalPoint.x - world.x * zoom;
                camera.y = focalPoint.y - world.y * zoom;
                camera.zoom = zoom;
        };

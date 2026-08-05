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

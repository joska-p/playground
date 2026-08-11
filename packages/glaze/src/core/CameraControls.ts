import { Camera, clamp, DEFAULT_ZOOM_BOUNDS, type Point2D, type ZoomBounds } from './Camera';

/**
 * Explicit camera mutation contract. `Camera` stays passive; everything that changes its
 * `x`/`y`/`zoom` goes through here, so bounds and focal-point math are enforced in exactly one
 * place.
 */
export interface CameraControls {
    panTo(position: Point2D): void;
    panBy(dx: number, dy: number): void;
    zoomTo(zoom: number, focalPoint?: Point2D): void;
    zoomAt(focalPoint: Point2D, zoom: number): void;
    zoomBy(factor: number, focalPoint: Point2D): void;
    reset(): void;
    update(partial: Partial<Camera>): void;
}

export function createCameraControls(
    camera: Camera,
    minZoom: number = DEFAULT_ZOOM_BOUNDS.minZoom,
    maxZoom: number = DEFAULT_ZOOM_BOUNDS.maxZoom,
    initial: Camera = new Camera()
): CameraControls {
    const bounds: ZoomBounds = { minZoom, maxZoom };
    const clampZoom = clamp(bounds.minZoom, bounds.maxZoom);

    const zoomAt = (focalPoint: Point2D, zoom: number): void => {
        const next = clampZoom(zoom);
        const world = camera.screenToWorld(focalPoint);
        camera.x = focalPoint.x - world.x * next;
        camera.y = focalPoint.y - world.y * next;
        camera.zoom = next;
    };

    return {
        panTo(position: Point2D): void {
            camera.x = position.x;
            camera.y = position.y;
        },

        panBy(dx: number, dy: number): void {
            camera.x += dx;
            camera.y += dy;
        },

        zoomAt,

        zoomTo(zoom: number, focalPoint?: Point2D): void {
            if (focalPoint) {
                zoomAt(focalPoint, zoom);
            } else {
                camera.zoom = clampZoom(zoom);
            }
        },

        zoomBy(factor: number, focalPoint: Point2D): void {
            zoomAt(focalPoint, camera.zoom * factor);
        },

        reset(): void {
            camera.x = initial.x;
            camera.y = initial.y;
            camera.zoom = initial.zoom;
        },

        update(partial: Partial<Camera>): void {
            Object.assign(camera, partial);
        }
    };
}

import { compose2d, scaling2d, translation2d, type Mat2D } from './mat2d';
import type { Vec2 } from './vec2';

/**
 * A pan/zoom viewport. `(x, y)` is the screen-space offset, `zoom` the scale
 * factor. A world point maps to screen with `screen = world * zoom + (x, y)`.
 */
export type Camera = { x: number; y: number; zoom: number };

export const defaultCamera = (): Camera => ({ x: 0, y: 0, zoom: 1 });

/** World → screen transform for a camera. */
export const cameraMatrix = (camera: Camera): Mat2D =>
        compose2d(translation2d(camera.x, camera.y), scaling2d(camera.zoom));

/** Screen → world: `world = (screen - (x, y)) / zoom`. */
export const screenToWorld =
        (camera: Camera) =>
        (screen: Vec2): Vec2 => ({
                x: (screen.x - camera.x) / camera.zoom,
                y: (screen.y - camera.y) / camera.zoom
        });

/** World → screen. */
export const worldToScreen =
        (camera: Camera) =>
        (world: Vec2): Vec2 => ({
                x: world.x * camera.zoom + camera.x,
                y: world.y * camera.zoom + camera.y
        });

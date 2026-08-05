import type { Point2D } from './camera';

export function createCanvasToNormalized(canvasWidth: number, canvasHeight: number) {
        return (vector: Point2D): Point2D => ({
                x: canvasWidth > 0 ? vector.x / canvasWidth : 0,
                y: canvasHeight > 0 ? vector.y / canvasHeight : 0
        });
}

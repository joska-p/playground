import type { Point2D } from './camera';

export type CanvasElementBounds = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export function createScreenToCanvas(canvasElementBounds: CanvasElementBounds) {
    return (vector: Point2D): Point2D => ({
        x: vector.x - canvasElementBounds.left,
        y: vector.y - canvasElementBounds.top
    });
}

import type { Point2D } from './camera';

export function createNormalizedToUv() {
    return (vector: Point2D): Point2D => ({
        x: vector.x,
        y: 1 - vector.y
    });
}

import type { Camera, Point2D } from '../../core/Camera';

/**
 * GL 3x3 matrix in column-major order (element `i` = row `i % 3`, column `i / 3`), fed straight
 * into `uniformMatrix3fv`.
 */
export type Mat3 = readonly [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];

export function multiplyMat3(a: Mat3, b: Mat3): Mat3 {
    return [
        a[0] * b[0] + a[3] * b[1] + a[6] * b[2],
        a[1] * b[0] + a[4] * b[1] + a[7] * b[2],
        a[2] * b[0] + a[5] * b[1] + a[8] * b[2],
        a[0] * b[3] + a[3] * b[4] + a[6] * b[5],
        a[1] * b[3] + a[4] * b[4] + a[7] * b[5],
        a[2] * b[3] + a[5] * b[4] + a[8] * b[5],
        a[0] * b[6] + a[3] * b[7] + a[6] * b[8],
        a[1] * b[6] + a[4] * b[7] + a[7] * b[8],
        a[2] * b[6] + a[5] * b[7] + a[8] * b[8]
    ];
}

export function sameMat3(a: Mat3, b: Mat3): boolean {
    for (let i = 0; i < 9; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 * World → screen (CSS px, y-down): `screen = world * zoom + camera.xy`.
 * @param camera
 */
export function cameraMatrix(camera: Camera): Mat3 {
    return [camera.zoom, 0, 0, 0, camera.zoom, 0, camera.x, camera.y, 1];
}

/**
 * Screen (CSS px, y-down) → NDC.
 * @param width
 * @param height
 */
export function viewportMatrix(width: number, height: number): Mat3 {
    return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
}

/**
 * World → NDC for a single batched draw call.
 * @param camera
 * @param width
 * @param height
 */
export function projectionFor(camera: Camera, width: number, height: number): Mat3 {
    return multiplyMat3(viewportMatrix(width, height), cameraMatrix(camera));
}

const MIN_CIRCLE_SEGMENTS = 12;
const MAX_CIRCLE_SEGMENTS = 128;
const MIN_CAP_SEGMENTS = 4;
const MAX_CAP_SEGMENTS = 32;

const clamp = (value: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, value));

/**
 * Tessellation of a circle scales with its screen size.
 * @param radius
 * @param zoom
 */
export function circleSegments(radius: number, zoom: number): number {
    return clamp(Math.round(radius * zoom), MIN_CIRCLE_SEGMENTS, MAX_CIRCLE_SEGMENTS);
}

/**
 * Tessellation of a line cap scales with its screen width.
 * @param width
 * @param zoom
 */
export function capSegments(width: number, zoom: number): number {
    return clamp(Math.round(width * zoom), MIN_CAP_SEGMENTS, MAX_CAP_SEGMENTS);
}

/**
 * `segments` points around the ring, starting at angle 0 (positive x).
 * @param cx
 * @param cy
 * @param radius
 * @param segments
 */
export function circleRing(cx: number, cy: number, radius: number, segments: number): Point2D[] {
    const points: Point2D[] = [];
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
    }
    return points;
}

export function circleFillVertices(radius: number, zoom: number): number {
    return circleSegments(radius, zoom) * 3;
}

export function circleStrokeVertices(radius: number, zoom: number): number {
    return circleSegments(radius, zoom) * 6;
}

export function rectFillVertices(): number {
    return 6;
}

export function rectStrokeVertices(): number {
    return 24;
}

/**
 * Center quad plus two rounded caps.
 * @param width
 * @param zoom
 */
export function lineVertices(width: number, zoom: number): number {
    return 6 + 2 * capSegments(width, zoom) * 3;
}

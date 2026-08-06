import { describe, expect, it } from 'vitest';
import {
        type Mat3,
        cameraMatrix,
        capSegments,
        circleFillVertices,
        circleRing,
        circleSegments,
        circleStrokeVertices,
        lineVertices,
        multiplyMat3,
        projectionFor,
        rectFillVertices,
        rectStrokeVertices,
        sameMat3,
        viewportMatrix
} from './geometry';

const apply = (m: Mat3, x: number, y: number): [number, number] => [
        m[0] * x + m[3] * y + m[6],
        m[1] * x + m[4] * y + m[7]
];

describe('mat3 helpers', () => {
        it('viewport maps CSS px (y-down) to NDC', () => {
                const m = viewportMatrix(800, 600);
                expect(apply(m, 0, 0)).toEqual([-1, 1]);
                expect(apply(m, 400, 300)).toEqual([0, 0]);
                expect(apply(m, 800, 600)).toEqual([1, -1]);
        });

        it('camera matrix maps world to screen', () => {
                const m = cameraMatrix({ x: 100, y: 50, zoom: 2 });
                expect(apply(m, 10, 20)).toEqual([120, 90]);
        });

        it('default camera is the identity', () => {
                const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1] as const;
                expect(sameMat3(cameraMatrix({ x: 0, y: 0, zoom: 1 }), identity)).toBe(true);
        });

        it('projection composes camera then viewport', () => {
                const p = projectionFor({ x: 100, y: 50, zoom: 2 }, 800, 600);
                const [originX, originY] = apply(p, 0, 0);
                expect(originX).toBeCloseTo(-0.75, 5);
                expect(originY).toBeCloseTo(0.83333, 5);
                expect(apply(p, 10, 20)).toEqual([-0.7, 0.7]);
        });

        it('multiply applies the second argument first', () => {
                const doubled = [2, 0, 0, 0, 2, 0, 0, 0, 1] as const;
                expect(apply(multiplyMat3(doubled, doubled), 1, 1)).toEqual([4, 4]);
        });
});

describe('tessellation helpers', () => {
        it('circle segment count scales with zoom and clamps', () => {
                expect(circleSegments(1, 1)).toBe(12);
                expect(circleSegments(100, 1)).toBe(100);
                expect(circleSegments(1000, 1)).toBe(128);
        });

        it('cap segment count clamps', () => {
                expect(capSegments(1, 1)).toBe(4);
                expect(capSegments(8, 1)).toBe(8);
                expect(capSegments(100, 1)).toBe(32);
        });

        it('circle ring returns segments points starting at positive x', () => {
                const ring = circleRing(0, 0, 5, 8);
                expect(ring).toHaveLength(8);
                expect(ring[0]).toEqual({ x: 5, y: 0 });
                const mid = ring[2] as { x: number; y: number };
                expect(Math.hypot(mid.x, mid.y)).toBeCloseTo(5, 5);
        });

        it('vertex counts match the pushed geometry', () => {
                expect(circleFillVertices(10, 1)).toBe(circleSegments(10, 1) * 3);
                expect(circleStrokeVertices(10, 1)).toBe(circleSegments(10, 1) * 6);
                expect(rectFillVertices()).toBe(6);
                expect(rectStrokeVertices()).toBe(24);
                expect(lineVertices(2, 1)).toBe(6 + 2 * capSegments(2, 1) * 3);
        });
});

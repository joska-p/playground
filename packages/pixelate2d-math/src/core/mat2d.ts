import type { Vec2 } from './vec2';

/**
 * 2D affine transform in Canvas2D-compatible form:
 *
 * ```ts
 * x' = a*x + c*y + tx
 * y' = b*x + d*y + ty
 * ```
 *
 * The same layout maps 1:1 onto Canvas2D `transform()` and converts trivially
 * to a GL 3x3 column-major matrix (see {@link toMat3}).
 */
export type Mat2D = {
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
};

export const identity2d = (): Mat2D => ({ a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 });

export const mat2d = (
        a: number,
        b: number,
        c: number,
        d: number,
        tx: number,
        ty: number
): Mat2D => ({
        a,
        b,
        c,
        d,
        tx,
        ty
});

export const translation2d = (dx: number, dy: number): Mat2D => mat2d(1, 0, 0, 1, dx, dy);

export const rotation2d = (angle: number): Mat2D => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return mat2d(cos, sin, -sin, cos, 0, 0);
};

export const scaling2d = (sx: number, sy: number = sx): Mat2D => mat2d(sx, 0, 0, sy, 0, 0);

/**
 * Matrix product `m1 * m2` — apply `m2` first, then `m1`. Read left-to-right:
 * `multiply2d(rotate)(translate)` rotates after translating.
 */
export const multiply2d =
        (m1: Mat2D) =>
        (m2: Mat2D): Mat2D => ({
                a: m1.a * m2.a + m1.c * m2.b,
                b: m1.b * m2.a + m1.d * m2.b,
                c: m1.a * m2.c + m1.c * m2.d,
                d: m1.b * m2.c + m1.d * m2.d,
                tx: m1.a * m2.tx + m1.c * m2.ty + m1.tx,
                ty: m1.b * m2.tx + m1.d * m2.ty + m1.ty
        });

/** Compose a chain of transforms, applying the rightmost argument first. */
export const compose2d = (...matrices: readonly Mat2D[]): Mat2D =>
        matrices.reduce((acc, m) => multiply2d(m)(acc), identity2d());

/** Apply the transform to a point. */
export const apply2d =
        (m: Mat2D) =>
        (p: Vec2): Vec2 => ({
                x: m.a * p.x + m.c * p.y + m.tx,
                y: m.b * p.x + m.d * p.y + m.ty
        });

/** Inverse; returns the identity if the matrix is singular. */
export const invert2d = (m: Mat2D): Mat2D => {
        const det = m.a * m.d - m.b * m.c;
        if (det === 0) return identity2d();
        const inv = 1 / det;
        return mat2d(
                m.d * inv,
                -m.b * inv,
                -m.c * inv,
                m.a * inv,
                (m.c * m.ty - m.d * m.tx) * inv,
                (m.b * m.tx - m.a * m.ty) * inv
        );
};

/**
 * Convert to a GL 3x3 column-major matrix (9 elements) so it can be fed
 * straight into `uniformMatrix3fv`.
 */
export const toMat3 = (
        m: Mat2D
): readonly [number, number, number, number, number, number, number, number, number] => [
        m.a,
        m.b,
        0,
        m.c,
        m.d,
        0,
        m.tx,
        m.ty,
        1
];

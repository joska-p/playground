/**
 * Scalar helpers used across the math package.
 */

/** Clamp `value` into the inclusive range `[min, max]`. */
export const clamp =
        (min: number) =>
        (max: number) =>
        (value: number): number =>
                Math.min(max, Math.max(min, value));

/** Linear interpolation between `a` and `b` by factor `t` (clamped-free). */
export const lerp =
        (a: number) =>
        (b: number) =>
        (t: number): number =>
                a + (b - a) * t;

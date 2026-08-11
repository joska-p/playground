/**
 * Clamp a number to the range [-1, 1].
 *
 * @param v
 */
export const clamp = (v: number): number => (v < -1 ? -1 : v > 1 ? 1 : v);

/** Clamp a number to the range [-1, 1]. */
export const clamp = (v: number): number => (v < -1 ? -1 : v > 1 ? 1 : v);

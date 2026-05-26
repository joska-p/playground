import type { PixelCallback } from "../core/types.js";

/**
 * Adjusts brightness by a factor.
 * factor > 1 brightens, factor < 1 darkens.
 * Clamping to [0, 255] is handled by iteratePixels.
 */
const brightness =
  (factor: number): PixelCallback =>
  ({ r, g, b, a }) => ({
    r: r * factor,
    g: g * factor,
    b: b * factor,
    a,
  });

export { brightness };

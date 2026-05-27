import type { PixelCallback } from "../core/pixel.types";

/**
 * Adjusts brightness by a factor.
 * factor > 1 brightens, factor < 1 darkens.
 * Clamping to [0, 255] is handled by iteratePixels.
 */
const callback =
  (factor = 1.6): PixelCallback =>
  ({ r, g, b, a }) => ({
    r: r * factor,
    g: g * factor,
    b: b * factor,
    a,
  });

const brightness = {
  name: "brightness",
  description: "Adjusts brightness by a factor.",
  callback,
} as const;

export { brightness };

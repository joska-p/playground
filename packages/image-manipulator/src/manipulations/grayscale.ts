import type { PixelCallback } from "../core/types";

/**
 * Converts a pixel to grayscale using luminance weights.
 * These weights match human perception (we're more sensitive to green).
 */
const callback =
  (): PixelCallback =>
  ({ r, g, b, a }) => {
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return { r: luminance, g: luminance, b: luminance, a };
  };

const grayscale = {
  name: "grayscale",
  description: "Converts a pixel to grayscale using luminance weights.",
  callback,
} as const;

export { grayscale };

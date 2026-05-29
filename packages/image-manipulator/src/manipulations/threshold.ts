import type { PixelCallback } from "../core/pixel.types";

const callback =
  (threshold = 128): PixelCallback =>
  ({ r, g, b, a }) => {
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const value = luminance >= threshold ? 255 : 0;
    return { r: value, g: value, b: value, a };
  };

const threshold = {
  name: "threshold",
  description: "Converts to black and white based on a luminance threshold.",
  callback,
  defaultArgs: { threshold: 128 },
  argDefinitions: [{ key: "threshold", label: "Threshold", min: 0, max: 255, step: 1 }],
} as const;

export { threshold };

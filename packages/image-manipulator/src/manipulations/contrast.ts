import type { PixelCallback } from "../core/pixel.types";

const callback =
  (factor = 1.5): PixelCallback =>
  ({ r, g, b, a }) => {
    const midpoint = 128;
    return {
      r: midpoint + (r - midpoint) * factor,
      g: midpoint + (g - midpoint) * factor,
      b: midpoint + (b - midpoint) * factor,
      a,
    };
  };

const contrast = {
  name: "contrast",
  description: "Adjusts contrast by a factor.",
  callback,
  defaultArgs: { factor: 1.5 },
  argDefinitions: [{ key: "factor", label: "Factor", min: 0, max: 3, step: 0.1 }],
} as const;

export { contrast };

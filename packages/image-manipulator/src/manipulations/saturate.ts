import type { PixelCallback } from "../core/pixel.types";

const callback =
  (amount = 1.5): PixelCallback =>
  ({ r, g, b, a }) => {
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return {
      r: luminance + (r - luminance) * amount,
      g: luminance + (g - luminance) * amount,
      b: luminance + (b - luminance) * amount,
      a,
    };
  };

const saturate = {
  name: "saturate",
  description: "Adjusts color saturation.",
  callback,
  defaultArgs: { amount: 1.5 },
  argDefinitions: [{ key: "amount", label: "Amount", min: 0, max: 3, step: 0.1 }],
} as const;

export { saturate };

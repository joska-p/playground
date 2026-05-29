import type { PixelCallback } from "../core/pixel.types";

const callback = (): PixelCallback => ({ r, g, b, a }) => ({
  r: r * 0.393 + g * 0.769 + b * 0.189,
  g: r * 0.349 + g * 0.686 + b * 0.168,
  b: r * 0.272 + g * 0.534 + b * 0.131,
  a,
});

const sepia = {
  name: "sepia",
  description: "Applies a warm sepia tone.",
  callback,
  defaultArgs: {},
  argDefinitions: [],
} as const;

export { sepia };

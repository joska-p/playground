import type { PixelCallback } from "../core/pixel.types";

const callback = (): PixelCallback => ({ r, g, b, a }) => ({
  r: 255 - r,
  g: 255 - g,
  b: 255 - b,
  a,
});

const invert = {
  name: "invert",
  description: "Inverts all color channels.",
  callback,
  defaultArgs: {},
  argDefinitions: [],
} as const;

export { invert };

import { definePixel } from "../../manipulation-factories";

export const grayscale = definePixel("grayscale", (_, r, g, b, a) => {
  const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
  return [l, l, l, a];
});

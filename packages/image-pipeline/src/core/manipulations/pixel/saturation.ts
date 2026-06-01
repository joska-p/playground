import { definePixel } from "../../manipulation-factories";

export const saturation = definePixel("saturation", (options: { value?: number }, r, g, b, a) => {
  const v = options.value ?? 1;
  const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
  return [l + (r - l) * v, l + (g - l) * v, l + (b - l) * v, a];
});

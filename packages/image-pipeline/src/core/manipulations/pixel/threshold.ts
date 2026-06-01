import { definePixel } from "../../manipulation-factories";

export const threshold = definePixel("threshold", (r, g, b, a, options: { threshold?: number }) => {
  const t = options.threshold ?? 128;
  const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const v = l >= t ? 255 : 0;
  return [v, v, v, a];
});

import { definePixel } from "../../manipulation-factories";

export const brightness = definePixel("brightness", (r, g, b, a, options: { value?: number }) => {
  const v = options.value ?? 1;
  return [r * v, g * v, b * v, a];
});

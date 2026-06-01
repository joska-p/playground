import { definePixel } from "../../manipulation-factories";

export const brightness = definePixel("brightness", (options: { value?: number }, r, g, b, a) => {
  const v = options.value ?? 1;
  return [r * v, g * v, b * v, a];
});

import { definePixel } from "../../manipulation-factories";

export const contrast = definePixel("contrast", (r, g, b, a, options: { value?: number }) => {
  const v = options.value ?? 1;
  return [(r - 128) * v + 128, (g - 128) * v + 128, (b - 128) * v + 128, a];
});

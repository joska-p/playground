import { definePixel } from "../../manipulation-factories";

export const contrast = definePixel("contrast", (options: { value?: number }, r, g, b, a) => {
  const v = options.value ?? 1;
  return [(r - 128) * v + 128, (g - 128) * v + 128, (b - 128) * v + 128, a];
});

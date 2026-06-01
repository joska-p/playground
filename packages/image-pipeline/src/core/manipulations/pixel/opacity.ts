import { definePixel } from "../../manipulation-factories";

export const opacity = definePixel("opacity", (options: { value?: number }, r, g, b, a) => {
  const v = options.value ?? 1;
  return [r, g, b, a * v];
});

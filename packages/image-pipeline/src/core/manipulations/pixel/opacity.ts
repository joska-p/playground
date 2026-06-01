import { definePixel } from "../../manipulation-factories";

export const opacity = definePixel("opacity", (r, g, b, a, options: { value?: number }) => {
  const v = options.value ?? 1;
  return [r, g, b, a * v];
});

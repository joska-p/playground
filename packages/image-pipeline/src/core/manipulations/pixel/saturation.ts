import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const saturation: ManipulationDefinition = {
  id: "saturation",
  type: "pixel",
  fn: ((r, g, b, a, options) => {
    const v = (options["value"] as number) ?? 1;
    const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
    return [l + (r - l) * v, l + (g - l) * v, l + (b - l) * v, a];
  }) as PixelFn,
};

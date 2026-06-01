import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const contrast: ManipulationDefinition = {
  id: "contrast",
  type: "pixel",
  fn: ((r, g, b, a, options) => {
    const v = (options["value"] as number) ?? 1;
    return [(r - 128) * v + 128, (g - 128) * v + 128, (b - 128) * v + 128, a];
  }) as PixelFn,
};

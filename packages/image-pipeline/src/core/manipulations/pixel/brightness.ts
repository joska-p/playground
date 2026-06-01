import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const brightness: ManipulationDefinition = {
  id: "brightness",
  type: "pixel",
  fn: ((r, g, b, a, options) => {
    const v = (options["value"] as number) ?? 1;
    return [r * v, g * v, b * v, a];
  }) as PixelFn,
};

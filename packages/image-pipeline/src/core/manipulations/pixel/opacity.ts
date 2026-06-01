import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const opacity: ManipulationDefinition = {
  id: "opacity",
  type: "pixel",
  fn: ((r, g, b, a, options) => {
    const v = (options["value"] as number) ?? 1;
    return [r, g, b, a * v];
  }) as PixelFn,
};

import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const invert: ManipulationDefinition = {
  id: "invert",
  type: "pixel",
  fn: ((r, g, b, a) => [255 - r, 255 - g, 255 - b, a]) as PixelFn,
};

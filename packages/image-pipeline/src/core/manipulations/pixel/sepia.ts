import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const sepia: ManipulationDefinition = {
  id: "sepia",
  type: "pixel",
  fn: ((r, g, b, a) => [
    r * 0.393 + g * 0.769 + b * 0.189,
    r * 0.349 + g * 0.686 + b * 0.168,
    r * 0.272 + g * 0.534 + b * 0.131,
    a,
  ]) as PixelFn,
};

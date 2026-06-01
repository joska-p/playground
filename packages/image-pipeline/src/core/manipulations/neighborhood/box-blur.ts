import type { ManipulationDefinition, NeighborhoodFn } from "../../image-pipeline.types";
import { applyKernel } from "./helpers";

export const boxBlur: ManipulationDefinition = {
  id: "box-blur",
  type: "neighborhood",
  radius: 1,
  fn: ((src, dest, width, height, options) => {
    const radius = (options["radius"] as number) ?? 1;
    const size = radius * 2 + 1;
    applyKernel(
      src, dest, width, height,
      new Array<number>(size * size).fill(1),
      size,       size * size
    );
  }) as NeighborhoodFn,
};

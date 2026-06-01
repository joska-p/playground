import type { ManipulationDefinition, NeighborhoodFn } from "../../image-pipeline.types";
import { applyKernel } from "./helpers";

export const sharpen: ManipulationDefinition = {
  id: "sharpen",
  type: "neighborhood",
  radius: 1,
  fn: ((src, dest, width, height, options) => {
    const s = (options["strength"] as number) ?? 1;
    const kernel = [0, -s, 0, -s, 1 + 4 * s, -s, 0, -s, 0];
    applyKernel(src, dest, width, height, kernel, 3, 1);
  }) as NeighborhoodFn,
};

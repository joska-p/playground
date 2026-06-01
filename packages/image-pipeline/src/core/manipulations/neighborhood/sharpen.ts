import { defineNeighbor } from "../../manipulation-factories";
import { applyKernel } from "./helpers";

export const sharpen = defineNeighbor("sharpen", 1, (src, dest, width, height, options: { strength?: number }) => {
  const s = options.strength ?? 1;
  const kernel = [0, -s, 0, -s, 1 + 4 * s, -s, 0, -s, 0];
  applyKernel(src, dest, width, height, kernel, 3, 1);
});

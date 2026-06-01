import { defineNeighbor } from "../../manipulation-factories";
import { applyKernel } from "./helpers";

export const boxBlur = defineNeighbor(
  "box-blur",
  1,
  (options: { radius?: number }, src, dest, width, height) => {
    const radius = options.radius ?? 1;
    const size = radius * 2 + 1;
    applyKernel(
      src,
      dest,
      width,
      height,
      new Array<number>(size * size).fill(1),
      size,
      size * size
    );
  }
);

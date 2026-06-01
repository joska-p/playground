import type { ManipulationDefinition, WholeImageFn } from "../../image-pipeline.types";

export const flipVertical: ManipulationDefinition = {
  id: "flip-vertical",
  type: "whole",
  fn: ((imageData) => {
    const { width, height, data } = imageData;
    const out = new ImageData(width, height);
    for (let y = 0; y < height; y++) {
      out.data.set(
        data.subarray(y * width * 4, (y + 1) * width * 4),
        (height - 1 - y) * width * 4
      );
    }
    return out;
  }) as WholeImageFn,
};

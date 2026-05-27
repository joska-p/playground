import { iteratePixels } from "./iteratePixels";
import type { PixelCallback } from "./types";

/**
 * Creates a new independent image from the source by applying a callback.
 * The source is never mutated. Each fork always receives the original data,
 * not the output of any other fork or pipe.
 *
 * Use when a manipulation needs to produce a *derived* image rather than
 * modify the original in place — e.g. an energy map or a seam map for
 * seam carving, where you need multiple images derived from the same source:
 *
 *   const energyMap = fork(computeEnergy)(imageData)
 *   const seamMap   = fork(findSeams)(energyMap)
 *   const result    = pipe(removeSeams(seamMap))(imageData)
 */
function fork(callback: PixelCallback) {
  return (imageData: ImageData): ImageData => {
    const copy = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    );
    return iteratePixels(copy, [callback]);
  };
}

export { fork };

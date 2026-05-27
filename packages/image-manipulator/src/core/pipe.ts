import { iteratePixels } from "./iteratePixels";
import type { PixelCallback } from "./types";

/**
 * Composes multiple pixel callbacks into a single transformation.
 * All callbacks run in one loop pass — output of each feeds into the next.
 *
 * Use for transformations that operate on the same image sequentially:
 *   const transform = pipe(grayscale(), brighten(0.2))
 *   const result = transform(imageData)
 */
function pipe(...callbacks: PixelCallback[]) {
  return (imageData: ImageData): ImageData => {
    return iteratePixels(imageData, callbacks);
  };
}

export { pipe };

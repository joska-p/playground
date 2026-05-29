import { iteratePixels } from "./iteratePixels";
import { putImageData } from "./imageData";
import type { PixelCallback } from "./pixel.types";

function manipulate(imageData: ImageData) {
  const callbacks: PixelCallback[] = [];

  const chain = {
    apply(callback: PixelCallback) {
      callbacks.push(callback);
      return chain;
    },
    toImageData() {
      return iteratePixels(imageData, callbacks);
    },
    toArray() {
      const results: ImageData[] = [imageData];
      let current = imageData;
      for (const cb of callbacks) {
        current = iteratePixels(current, [cb]);
        results.push(current);
      }
      return results;
    },
    toCanvas(canvas: HTMLCanvasElement) {
      putImageData(canvas, iteratePixels(imageData, callbacks));
    },
  };

  return chain;
}

export { manipulate };

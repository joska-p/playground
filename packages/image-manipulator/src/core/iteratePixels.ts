import type { PixelCallback, PixelContext } from "./pixel.types";

/**
 * The core loop. Iterates every pixel, runs all callbacks in sequence
 * per pixel (chained: output of one feeds into the next), and returns
 * a new ImageData. The source is never mutated.
 *
 * This is the primitive that `pipe` and `fork` are both built on.
 */
function iteratePixels(source: ImageData, callbacks: PixelCallback[]): ImageData {
  const output = new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);

  for (let y = 0; y < source.height; y++) {
    for (let x = 0; x < source.width; x++) {
      const index = (y * source.width + x) * 4;

      // Build context from current output state (modified by previous callbacks)
      // but expose sourceData so callbacks can read original neighbours
      let ctx: PixelContext = {
        r: output.data[index],
        g: output.data[index + 1],
        b: output.data[index + 2],
        a: output.data[index + 3],
        x,
        y,
        index,
        width: source.width,
        height: source.height,
        sourceData: source.data,
      };

      // Chain callbacks: each receives the output of the previous
      for (const callback of callbacks) {
        const result = callback(ctx);
        ctx = { ...ctx, ...result };
      }

      output.data[index] = Math.round(Math.max(0, Math.min(255, ctx.r)));
      output.data[index + 1] = Math.round(Math.max(0, Math.min(255, ctx.g)));
      output.data[index + 2] = Math.round(Math.max(0, Math.min(255, ctx.b)));
      output.data[index + 3] = Math.round(Math.max(0, Math.min(255, ctx.a)));
    }
  }

  return output;
}

export { iteratePixels };

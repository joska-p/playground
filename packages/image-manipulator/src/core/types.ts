/**
 * The context passed to every pixel callback.
 *
 * `r`, `g`, `b`, `a` reflect the current pixel value — which may already
 * have been modified by a previous callback in the same pipe pass.
 *
 * `sourceData` is always the *original* unmodified ImageData for that pass.
 * Use it for read-only neighbour access (e.g. blur, edge detection, energy map).
 */
type PixelContext = {
  r: number;
  g: number;
  b: number;
  a: number;
  x: number;
  y: number;
  index: number;
  width: number;
  height: number;
  sourceData: Uint8ClampedArray;
};

type RGBA = { r: number; g: number; b: number; a: number };

/**
 * A pixel callback receives context and returns the new RGBA for that pixel.
 * Use a factory function to capture any configuration:
 *
 *   const brighten = (amount: number): PixelCallback => (ctx) => ({ ...ctx, r: ctx.r + amount, ... })
 */
type PixelCallback = (ctx: PixelContext) => RGBA;

export type { PixelContext, PixelCallback, RGBA };

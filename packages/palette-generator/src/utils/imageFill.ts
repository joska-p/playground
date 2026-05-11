export type PixelFn = (
  x: number,
  y: number,
  width: number,
  height: number
) => [number, number, number];

/**
 * Fills an ImageData buffer by calling pixelFn for every pixel.
 * Accepts the raw data array and dimensions so it can be unit-tested
 * without a real ImageData/canvas.
 */
export function fillImageBuffer(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  pixelFn: PixelFn
): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixelFn(x, y, width, height);
      const idx = (y * width + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }
}

/** Convenience wrapper that fills a full ImageData object. */
export function fillSliceImageData(imgData: ImageData, pixelFn: PixelFn): void {
  fillImageBuffer(imgData.data, imgData.width, imgData.height, pixelFn);
}
